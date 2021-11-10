part of 'register_bloc.dart';

abstract class RegisterEvent extends Equatable {
  const RegisterEvent();

  @override
  List<Object> get props => [];

  @override
  bool get stringify => true;
}

class LoginChanged extends RegisterEvent {
  final String login;

  const LoginChanged({required this.login});

  @override
  List<Object> get props => [login];
}

class EmailChanged extends RegisterEvent {
  final String email;

  const EmailChanged({required this.email});

  @override
  List<Object> get props => [email];
}

class PasswordChanged extends RegisterEvent {
  final String password;

  const PasswordChanged({required this.password});

  @override
  List<Object> get props => [password];
}

class ConfirmPasswordChanged extends RegisterEvent {
  final String password;
  final String confirmPassword;

  const ConfirmPasswordChanged({required this.confirmPassword, required this.password});

  @override
  List<Object> get props => [confirmPassword, password];
}

class TermsAndConditionsChanged extends RegisterEvent {
  final bool termsAndConditions;

  const TermsAndConditionsChanged({required this.termsAndConditions});

  @override
  List<Object> get props => [termsAndConditions];
}

class FormSubmitted extends RegisterEvent {}
