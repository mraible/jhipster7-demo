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

enum PasswordValidationError { invalid }

extension PasswordValidationErrorX on PasswordValidationError {
String get invalidMessage =>S.current.pageRegisterPasswordValidationError(PasswordInput.numberMin);
}

class PasswordInput extends FormzInput<String, PasswordValidationError> {
  const PasswordInput.pure() : super.pure('');
  const PasswordInput.dirty([String value = '']) : super.dirty(value);

  static final int numberMin = 8;
  static final _passwordRegex = RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');

  @override
  PasswordValidationError? validator(String value) {
    return _passwordRegex.hasMatch(value) ? null
        : PasswordValidationError.invalid;
  }
}
