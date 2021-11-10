part of 'login_bloc.dart';

class LoginState extends Equatable {
  final LoginInput login;
  final PasswordInput password;
  final FormzStatus status;
  final String generalErrorKey;

  static final String authenticationFailKey = 'error.authenticate';

  const LoginState({
    this.login = const LoginInput.pure(),
    this.password = const PasswordInput.pure(),
    this.status = FormzStatus.pure,
    this.generalErrorKey = HttpUtils.generalNoErrorKey
  });

  LoginState copyWith({
    LoginInput? login,
    PasswordInput? password,
    FormzStatus? status,
    String? generalErrorKey
  }) {
    return LoginState(
      login: login ?? this.login,
      password: password ?? this.password,
      status: status ?? this.status,
      generalErrorKey: generalErrorKey ?? this.generalErrorKey,
    );
  }

  @override
  List<Object> get props => [login, password, status, generalErrorKey];

  @override
  bool get stringify => true;
}
