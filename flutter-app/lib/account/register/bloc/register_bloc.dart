import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';
import 'package:Flickr/shared/repository/account_repository.dart';
import 'package:Flickr/account/register/bloc/register_models.dart';
import 'package:Flickr/shared/models/user.dart';
import 'package:Flickr/shared/repository/http_utils.dart';

part 'register_events.dart';
part 'register_state.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final AccountRepository _accountRepository;

  RegisterBloc({required AccountRepository accountRepository}) :
        _accountRepository = accountRepository, super(const RegisterState());

  static final String passwordNotIdenticalKey = 'error.passwordnotidentical';
  static final String loginExistKey = 'error.userexists';
  static final String emailExistKey = 'error.emailexists';

  @override
  void onTransition(Transition<RegisterEvent, RegisterState> transition) {
    super.onTransition(transition);
  }

  @override
  Stream<RegisterState> mapEventToState(RegisterEvent event) async* {
    if (event is LoginChanged) {
       yield* onLoginChange(event);
    } else if (event is EmailChanged) {
      yield* onEmailChange(event);
    } else if (event is PasswordChanged) {
      yield* onPasswordChange(event);
    } else if (event is ConfirmPasswordChanged) {
      yield* onConfirmPasswordChange(event);
    } else if (event is TermsAndConditionsChanged) {
      yield* onTermAndConditionChange(event);
    } else if (event is FormSubmitted) {
      yield* onSubmit();
    }
  }

  Stream<RegisterState> onSubmit() async* {
    if (state.status.isValidated) {
      yield state.copyWith(status: FormzStatus.submissionInProgress);
      User newUser = new User(state.login.value, state.email.value, state.password.value, 'en', null, null);
      try {
        String? result = await _accountRepository.register(newUser);
        if (result != null && result.compareTo(HttpUtils.successResult) != 0) {
          yield state.copyWith(status: FormzStatus.submissionFailure, generalErrorKey: result);
        } else {
          yield state.copyWith(status: FormzStatus.submissionSuccess);
        }
      } catch (e) {
        yield state.copyWith(status: FormzStatus.submissionFailure,
            generalErrorKey: HttpUtils.errorServerKey);
      }
    }
  }

  Stream<RegisterState> onTermAndConditionChange(TermsAndConditionsChanged event) async* {
    final termsAndConditions = TermsAndConditionsInput.dirty(event.termsAndConditions);
    yield state.copyWith(
      termsAndConditions: termsAndConditions,
      status: Formz.validate([state.login, state.email, state.password, state.confirmPassword, termsAndConditions]),
    );
  }

  Stream<RegisterState> onConfirmPasswordChange(ConfirmPasswordChanged event) async* {
    final password = event.password;
    final confirmPassword = ConfirmPasswordInput.dirty(event.confirmPassword);
    if(password == confirmPassword.value) {
      yield state.copyWith(
        confirmPassword: confirmPassword,
        generalErrorKey: HttpUtils.generalNoErrorKey,
        status: Formz.validate([state.login, state.email, state.password, confirmPassword, state.termsAndConditions]),
      );
    } else {
      yield state.copyWith(
          confirmPassword: confirmPassword,
          status: FormzStatus.invalid, generalErrorKey: passwordNotIdenticalKey
      );
    }
  }

  Stream<RegisterState> onPasswordChange(PasswordChanged event) async* {
    final password = PasswordInput.dirty(event.password);
    yield state.copyWith(
      password: password,
      status: Formz.validate([state.login, state.email, password, state.confirmPassword, state.termsAndConditions]),
    );
  }

  Stream<RegisterState> onEmailChange(EmailChanged event) async* {
    final email = EmailInput.dirty(event.email);
    yield state.copyWith(
      email: email,
      status: Formz.validate([state.login, email, state.password, state.confirmPassword, state.termsAndConditions]),
    );
  }

  Stream<RegisterState> onLoginChange(LoginChanged event) async* {
     final login = LoginInput.dirty(event.login);
     yield state.copyWith(
       login: login,
       status: Formz.validate([login, state.email, state.password, state.confirmPassword, state.termsAndConditions]),
    );
  }
}
