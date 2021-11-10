import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:formz/formz.dart';
import 'package:equatable/equatable.dart';
import 'package:Flickr/account/login/bloc/login_models.dart';
import 'package:Flickr/account/login/login_repository.dart';
import 'package:Flickr/shared/models/user_jwt.dart';
import 'package:Flickr/shared/repository/http_utils.dart';

part 'login_events.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final LoginRepository _loginRepository;

  LoginBloc({required LoginRepository loginRepository}) :
        _loginRepository = loginRepository, super(const LoginState());

  @override
  void onTransition(Transition<LoginEvent, LoginState> transition) {
    super.onTransition(transition);
  }

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    if (event is LoginChanged) {
      yield* onLoginChange(event);
    } else if (event is PasswordChanged) {
      yield* onPasswordChange(event);
    } else if (event is FormSubmitted) {
      yield* onSubmit();
    }
  }

  Stream<LoginState> onSubmit() async* {
    if (state.status.isValidated) {
      yield state.copyWith(status: FormzStatus.submissionInProgress);
      UserJWT userJWT = UserJWT(state.login.value, state.password.value);
      try {
        var token = await _loginRepository.authenticate(userJWT);
        if (token.idToken != null) {
          FlutterSecureStorage storage = new FlutterSecureStorage();
          await storage.delete(key: HttpUtils.keyForJWTToken);
          await storage.write(key: HttpUtils.keyForJWTToken, value: token.idToken);
          yield state.copyWith(status: FormzStatus.submissionSuccess);
        } else {
          yield state.copyWith(status: FormzStatus.submissionFailure,
              generalErrorKey: LoginState.authenticationFailKey);
        }
      } catch (e) {
        yield state.copyWith(status: FormzStatus.submissionFailure,
            generalErrorKey: HttpUtils.errorServerKey);
      }
    }
  }

  Stream<LoginState> onPasswordChange(PasswordChanged event) async* {
    final password = PasswordInput.dirty(event.password);
    yield state.copyWith(
      password: password,
      status: Formz.validate([state.login, password]),
    );
  }

  Stream<LoginState> onLoginChange(LoginChanged event) async* {
    final login = LoginInput.dirty(event.login);
    yield state.copyWith(
      login: login,
      status: Formz.validate([login, state.password]),
    );
  }
}
