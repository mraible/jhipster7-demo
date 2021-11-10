import 'package:formz/formz.dart';
import 'package:Flickr/generated/l10n.dart';


enum LoginValidationError { invalid }

extension LoginValidationErrorX on LoginValidationError {
String get invalidMessage =>S.current.pageRegisterLoginValidationError(LoginInput.numberMin);
}

class LoginInput extends FormzInput<String, LoginValidationError> {
  const LoginInput.pure() : super.pure('');
  const LoginInput.dirty([String value = '']) : super.dirty(value);

  static final int numberMin = 3;

  @override
  LoginValidationError? validator(String value) {
    return value.length >= 3 ? null : LoginValidationError.invalid;
  }
}

enum EmailValidationError { invalid }

extension EmailValidationErrorX on EmailValidationError {
String get invalidMessage =>S.current.pageRegisterMailValidationError;
}

class EmailInput extends FormzInput<String, EmailValidationError> {
  const EmailInput.pure() : super.pure('');
  const EmailInput.dirty([String value = '']) : super.dirty(value);

  @override
  EmailValidationError? validator(String value) {
    return value.contains('@') ? null : EmailValidationError.invalid;
  }
}

enum PasswordValidationError { invalid }

extension PasswordValidationErrorX on PasswordValidationError {
String get invalidMessage =>S.current.pageRegisterPasswordValidationError(PasswordInput.numberMin);
}

class PasswordInput extends FormzInput<String, PasswordValidationError> {
  const PasswordInput.pure() : super.pure('');
  const PasswordInput.dirty([String value = '']) : super.dirty(value);

  static final _passwordRegex = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');
  static final int numberMin = 8;

  @override
  PasswordValidationError? validator(String value) {
    return _passwordRegex.hasMatch(value) ? null : PasswordValidationError.invalid;
  }
}

enum ConfirmPasswordValidationError { invalid }

extension ConfirmPasswordValidationErrorX on ConfirmPasswordValidationError {
String get invalidMessage =>S.current.pageRegisterConfirmationPasswordValidationError(ConfirmPasswordInput.numberMin);
}

class ConfirmPasswordInput extends FormzInput<String, ConfirmPasswordValidationError> {
  const ConfirmPasswordInput.pure() : super.pure('');
  const ConfirmPasswordInput.dirty([String value = '']) : super.dirty(value);

  static final _passwordRegex = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');
  static final int numberMin = 8;

  @override
  ConfirmPasswordValidationError? validator(String value) {
    return _passwordRegex.hasMatch(value) ? null : ConfirmPasswordValidationError.invalid;
  }
}

enum TermsAndConditionsValidationError { invalid }

class TermsAndConditionsInput extends FormzInput<bool, TermsAndConditionsValidationError> {
  const TermsAndConditionsInput.pure() : super.pure(false);
  const TermsAndConditionsInput.dirty([bool value = false]) : super.dirty(value);

  @override
  TermsAndConditionsValidationError? validator(bool value) {
    return value ? null : TermsAndConditionsValidationError.invalid;
  }
}
