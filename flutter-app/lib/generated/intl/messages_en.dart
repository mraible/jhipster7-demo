// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a en locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary {
  String get localeName => 'en';

  static m0(login) => "Current user : ${login}";

  static m1(min) => "Rules : 1 uppercase, 1 number and ${min} characters";

  static m2(min) => "The login has to contain more than ${min}";

  static m3(min) => "Rules : 1 uppercase, 1 number and ${min} characters";

  static m4(min) => "Firstname has to be ${min} characters minimum";

  static m5(min) => "Lastname has to be ${min} characters minimum";

  final messages = _notInlinedMessages(_notInlinedMessages);
  static _notInlinedMessages(_) => <String, Function> {
    "drawerLogoutTitle" : MessageLookupByLibrary.simpleMessage("Sign out"),
    "drawerMenuMain" : MessageLookupByLibrary.simpleMessage("Home"),
    "drawerMenuTitle" : MessageLookupByLibrary.simpleMessage("Menu"),
    "drawerSettingsTitle" : MessageLookupByLibrary.simpleMessage("Settings"),
    "entityActionConfirmDelete" : MessageLookupByLibrary.simpleMessage("Are you sure?"),
    "entityActionConfirmDeleteNo" : MessageLookupByLibrary.simpleMessage("No"),
    "entityActionConfirmDeleteYes" : MessageLookupByLibrary.simpleMessage("Yes"),
    "entityActionCreate" : MessageLookupByLibrary.simpleMessage("Create"),
    "entityActionDelete" : MessageLookupByLibrary.simpleMessage("Delete"),
    "entityActionEdit" : MessageLookupByLibrary.simpleMessage("Edit"),
    "entityActionView" : MessageLookupByLibrary.simpleMessage("View"),
    "genericErrorBadRequest" : MessageLookupByLibrary.simpleMessage("Something wrong happened with the received data"),
    "genericErrorServer" : MessageLookupByLibrary.simpleMessage("Something wrong when calling the server, please try again"),
    "loadingLabel" : MessageLookupByLibrary.simpleMessage("Loading..."),
    "locale" : MessageLookupByLibrary.simpleMessage("en"),
    "pageLoginBar" : MessageLookupByLibrary.simpleMessage("Login"),
    "pageLoginErrorAuthentication" : MessageLookupByLibrary.simpleMessage("Problem when authenticate, verify your credential"),
    "pageLoginLoginButton" : MessageLookupByLibrary.simpleMessage("Sign in"),
    "pageLoginRegisterButton" : MessageLookupByLibrary.simpleMessage("Register"),
    "pageLoginTitle" : MessageLookupByLibrary.simpleMessage("Welcome to Jhipster flutter app"),
    "pageMainCurrentUser" : m0,
    "pageMainEventButton" : MessageLookupByLibrary.simpleMessage("Event"),
    "pageMainMarketButton" : MessageLookupByLibrary.simpleMessage("Marketplace"),
    "pageMainNumberPackOpen" : MessageLookupByLibrary.simpleMessage("Packs"),
    "pageMainOpenPackButton" : MessageLookupByLibrary.simpleMessage("Open pack"),
    "pageMainProfileButton" : MessageLookupByLibrary.simpleMessage("Your profile"),
    "pageMainTitle" : MessageLookupByLibrary.simpleMessage("Main page"),
    "pageMainWelcome" : MessageLookupByLibrary.simpleMessage("Welcome to your Jhipster flutter app"),
    "pageRegisterConfirmationPasswordValidationError" : m1,
    "pageRegisterErrorLoginExist" : MessageLookupByLibrary.simpleMessage("Login already taken"),
    "pageRegisterErrorMailExist" : MessageLookupByLibrary.simpleMessage("Email already exist"),
    "pageRegisterErrorPasswordNotIdentical" : MessageLookupByLibrary.simpleMessage("The passwords are not identical"),
    "pageRegisterFormConfirmPassword" : MessageLookupByLibrary.simpleMessage("Confirm password"),
    "pageRegisterFormEmail" : MessageLookupByLibrary.simpleMessage("Email"),
    "pageRegisterFormEmailHint" : MessageLookupByLibrary.simpleMessage("you@example.com"),
    "pageRegisterFormLogin" : MessageLookupByLibrary.simpleMessage("Login"),
    "pageRegisterFormPassword" : MessageLookupByLibrary.simpleMessage("Password"),
    "pageRegisterFormSubmit" : MessageLookupByLibrary.simpleMessage("Sign up"),
    "pageRegisterFormTermsConditions" : MessageLookupByLibrary.simpleMessage("I accept the terms of use"),
    "pageRegisterFormTermsConditionsNotChecked" : MessageLookupByLibrary.simpleMessage("Please accept the terms and conditions"),
    "pageRegisterLoginValidationError" : m2,
    "pageRegisterMailValidationError" : MessageLookupByLibrary.simpleMessage("Please enter a valid address email"),
    "pageRegisterPasswordValidationError" : m3,
    "pageRegisterSuccess" : MessageLookupByLibrary.simpleMessage("Congratulation"),
    "pageRegisterSuccessAltImg" : MessageLookupByLibrary.simpleMessage("Register success"),
    "pageRegisterSuccessSub" : MessageLookupByLibrary.simpleMessage("You have successfuly registered"),
    "pageRegisterTitle" : MessageLookupByLibrary.simpleMessage("Register"),
    "pageSettingsEmailErrorValidation" : MessageLookupByLibrary.simpleMessage("Email format incorrect"),
    "pageSettingsFirstnameErrorValidation" : m4,
    "pageSettingsFormEmail" : MessageLookupByLibrary.simpleMessage("Email"),
    "pageSettingsFormFirstname" : MessageLookupByLibrary.simpleMessage("Firstname"),
    "pageSettingsFormLanguages" : MessageLookupByLibrary.simpleMessage("Languages"),
    "pageSettingsFormLastname" : MessageLookupByLibrary.simpleMessage("Lastname"),
    "pageSettingsFormSave" : MessageLookupByLibrary.simpleMessage("Save"),
    "pageSettingsLastnameErrorValidation" : m5,
    "pageSettingsSave" : MessageLookupByLibrary.simpleMessage("Settings saved !"),
    "pageSettingsTitle" : MessageLookupByLibrary.simpleMessage("Settings")
  };
}
