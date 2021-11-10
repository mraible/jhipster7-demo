import 'dart:async';
import 'dart:ui';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:formz/formz.dart';
import 'package:Flickr/account/settings/bloc/settings_models.dart';
import 'package:Flickr/generated/l10n.dart';
import 'package:Flickr/shared/models/user.dart';
import 'package:Flickr/shared/repository/account_repository.dart';
import 'package:Flickr/shared/repository/http_utils.dart';

part 'settings_events.dart';
part 'settings_state.dart';

class SettingsBloc extends Bloc<SettingsEvent, SettingsState> {
  final AccountRepository _accountRepository;
  final emailController = TextEditingController();
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();

  SettingsBloc({required AccountRepository accountRepository}) :
        _accountRepository = accountRepository, super(const SettingsState());

  static final String loginExistKey = 'error.userexists';
  static final String emailExistKey = 'error.emailexists';
  static final String successKey = 'success.settings';

  @override
  void onTransition(Transition<SettingsEvent, SettingsState> transition) {
    super.onTransition(transition);
  }

  @override
  Stream<SettingsState> mapEventToState(SettingsEvent event) async* {
    if (event is FirstnameChanged) {
       yield* onFirstnameChange(event);
    } else if (event is LastnameChanged) {
      yield* onLastnameChange(event);
    } else if (event is EmailChanged) {
      yield* onEmailChange(event);
    }      else if (event is LanguageChanged) {
      yield* onLanguageChange(event);
    }    else if (event is FormSubmitted) {
      yield* onSubmit();
    } else if (event is LoadCurrentUser) {
      yield* onLoadCurrentUser();
    }
  }

  Stream<SettingsState> onSubmit() async* {
    if (state.formStatus.isValidated) {
      yield state.copyWith(status: FormzStatus.submissionInProgress);
      SettingsAction action = SettingsAction.none;
      try {
        if(state.language.compareTo(state.currentUser.langKey!) != 0) {
          S.load(Locale(state.language));
          action = SettingsAction.reloadForLanguage;
        }

        User newCurrentUser = User(state.currentUser.login, state.email.value,
            state.currentUser.password,state.language, state.firstname.value, state.lastname.value);

        String? result = await _accountRepository.saveAccount(newCurrentUser);

        if (result != null && result.compareTo(HttpUtils.successResult) != 0) {
          yield state.copyWith(status: FormzStatus.submissionFailure,
              generalNotificationKey: result);
        } else {
          yield state.copyWith(currentUser: newCurrentUser,
              status: FormzStatus.submissionSuccess, action: action
          , generalNotificationKey: successKey);
        }
      } catch (e) {
        yield state.copyWith(status: FormzStatus.submissionFailure,
            generalNotificationKey: HttpUtils.errorServerKey);
      }
    }
  }

  Stream<SettingsState> onLanguageChange(LanguageChanged event) async* {
    yield state.copyWith(
      language: event.language,
      status: Formz.validate([state.firstname, state.lastname, state.email]),
    );
  }

  Stream<SettingsState> onEmailChange(EmailChanged event) async* {
    final email = EmailInput.dirty(event.email);
    yield state.copyWith(
      email: email,
      status: Formz.validate([state.firstname, email, state.lastname]),
    );
  }

  Stream<SettingsState> onLastnameChange(LastnameChanged event) async* {
    final lastname = LastnameInput.dirty(event.lastname);
    yield state.copyWith(
      lastname: lastname,
      status: Formz.validate([state.firstname, lastname, state.email]),
    );
  }

  Stream<SettingsState> onFirstnameChange(FirstnameChanged event) async* {
     final firstname = FirstnameInput.dirty(event.firstname);
     yield state.copyWith(
       firstname: firstname,
       status: Formz.validate([firstname, state.lastname, state.email]),
    );
  }

  Stream<SettingsState> onLoadCurrentUser() async* {
    User currentUser = await _accountRepository.getIdentity();
    String firstName = (currentUser.firstName != null ? currentUser.firstName: '')!;
    String lastName = (currentUser.lastName != null ? currentUser.lastName: '')!;
    String email = (currentUser.email != null ? currentUser.email: '')!;

    final firstNameInput = FirstnameInput.dirty(firstName);
    final lastNameInput = LastnameInput.dirty(lastName);
    final emailInput = EmailInput.dirty(email);

    yield state.copyWith(
        firstname: firstNameInput,
        lastname: lastNameInput,
        email: emailInput,
        language: currentUser.langKey,
        currentUser: currentUser,
        status: Formz.validate([firstNameInput, lastNameInput, emailInput]));

    emailController.text = email;
    lastNameController.text = lastName;
    firstNameController.text = firstName;
  }

  @override
  Future<void> close() {
    emailController.dispose();
    lastNameController.dispose();
    firstNameController.dispose();
    return super.close();
  }
}
