part of 'login_bloc.dart';

abstract class LoginEvent extends Equatable {
  const LoginEvent();

  @override
  List<Object> get props => [];

  @override
  bool get stringify => true;
}

class LoginChanged extends LoginEvent {
  final String login;

  const LoginChanged({required this.login});

  @override
  List<Object> get props => [login];
}

class PasswordChanged extends LoginEvent {
  final String password;

  const PasswordChanged({required this.password});

  @override
  List<Object> get props => [password];
}

class FormSubmitted extends LoginEvent {}
