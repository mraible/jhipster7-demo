part of 'settings_bloc.dart';

abstract class SettingsEvent extends Equatable {
  const SettingsEvent();

  @override
  List<Object> get props => [];

  @override
  bool get stringify => true;
}

class LoadCurrentUser extends SettingsEvent {}

class FirstnameChanged extends SettingsEvent {
  final String firstname;

  const FirstnameChanged({required this.firstname});

  @override
  List<Object> get props => [firstname];
}

class LastnameChanged extends SettingsEvent {
  final String lastname;

  const LastnameChanged({required this.lastname});

  @override
  List<Object> get props => [lastname];
}

class EmailChanged extends SettingsEvent {
  final String email;

  const EmailChanged({required this.email});

  @override
  List<Object> get props => [email];
}

class LanguageChanged extends SettingsEvent {
  final String language;

  const LanguageChanged({required this.language});

  @override
  List<Object> get props => [language];
}

class FormSubmitted extends SettingsEvent {}
