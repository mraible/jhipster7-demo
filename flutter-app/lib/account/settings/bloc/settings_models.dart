import 'package:formz/formz.dart';
import 'package:Flickr/generated/l10n.dart';

enum FirstnameValidationError { invalid }

extension FirstnameValidationErrorX on FirstnameValidationError {
String get invalidMessage =>S.current.pageSettingsFirstnameErrorValidation(FirstnameInput.numberMin);
}

class FirstnameInput extends FormzInput<String, FirstnameValidationError> {
  const FirstnameInput.pure() : super.pure('');
  const FirstnameInput.dirty([String value = '']) : super.dirty(value);

  static int numberMin = 3;

  @override
  FirstnameValidationError? validator(String value) {
    if(value.isEmpty == false){
      return value.length >= numberMin ? null : FirstnameValidationError.invalid;
    } else {
      return null;
    }
  }
}

enum LastnameValidationError { invalid }

extension LastnameValidationErrorX on LastnameValidationError {
String get invalidMessage =>S.current.pageSettingsLastnameErrorValidation(LastnameInput.numberMin);
}

class LastnameInput extends FormzInput<String, LastnameValidationError> {
  const LastnameInput.pure() : super.pure('');
  const LastnameInput.dirty([String value = '']) : super.dirty(value);

  static int numberMin = 3;

  @override
  LastnameValidationError? validator(String value) {
    if(value.isEmpty == false){
      return value.length >= numberMin ? null : LastnameValidationError.invalid;
    } else {
      return null;
    }
  }
}

enum EmailValidationError { invalid }

extension EmailValidationErrorX on EmailValidationError {
  String get invalidMessage =>S.current.pageSettingsEmailErrorValidation;
}

class EmailInput extends FormzInput<String, EmailValidationError> {
  const EmailInput.pure() : super.pure('');
  const EmailInput.dirty([String value = '']) : super.dirty(value);

  @override
  EmailValidationError? validator(String value) {
    return value.contains('@') ? null : EmailValidationError.invalid;
  }
}
