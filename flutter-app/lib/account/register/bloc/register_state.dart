part of 'register_bloc.dart';

class RegisterState extends Equatable {
  final LoginInput login;
  final EmailInput email;
  final PasswordInput password;
  final ConfirmPasswordInput confirmPassword;
  final TermsAndConditionsInput termsAndConditions;
  final FormzStatus status;
  final String generalErrorKey;

  const RegisterState({
    this.login = const LoginInput.pure(),
    this.email = const EmailInput.pure(),
    this.password = const PasswordInput.pure(),
    this.confirmPassword = const ConfirmPasswordInput.pure(),
    this.termsAndConditions = const TermsAndConditionsInput.pure(),
    this.status = FormzStatus.pure,
    this.generalErrorKey = HttpUtils.generalNoErrorKey
  });

  RegisterState copyWith({
    LoginInput? login,
    EmailInput? email,
    PasswordInput? password,
    ConfirmPasswordInput? confirmPassword,
    TermsAndConditionsInput? termsAndConditions,
    FormzStatus? status,
    String? generalErrorKey
  }) {
    return RegisterState(
      login: login ?? this.login,
      email: email ?? this.email,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      termsAndConditions: termsAndConditions ?? this.termsAndConditions,
      status: status ?? this.status,
      generalErrorKey: generalErrorKey ?? this.generalErrorKey,
    );
  }

  @override
  List<Object> get props => [login, email, password, confirmPassword, termsAndConditions, status, generalErrorKey];

  @override
  bool get stringify => true;
}
