import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:Flickr/account/login/login_repository.dart';
import 'package:Flickr/account/settings/bloc/settings_bloc.dart';
import 'package:Flickr/generated/l10n.dart';
import 'package:Flickr/environment.dart';
import 'package:Flickr/keys.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:Flickr/shared/repository/http_utils.dart';
import 'package:formz/formz.dart';
import 'package:Flickr/shared/widgets/drawer/bloc/drawer_bloc.dart';
import 'package:Flickr/shared/widgets/drawer/drawer_widget.dart';

import 'bloc/settings_models.dart';

class SettingsScreen extends StatelessWidget {
  SettingsScreen() : super(key: FlickrKeys.settingsScreen);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: BlocBuilder<SettingsBloc, SettingsState>(
              buildWhen: (previous, current) => previous.firstname != current.firstname
                  || current.action == SettingsAction.reloadForLanguage,
              builder: (context, state) {
                return Text(S.of(context).pageSettingsTitle);
              })
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(15.0),
          child: Column(children: <Widget>[settingsForm(context)]),
        ),
        drawer: BlocProvider<DrawerBloc>(
            create: (context) => DrawerBloc(loginRepository: LoginRepository()),
            child: FlickrDrawer())
    );
  }

  Widget settingsForm(BuildContext context) {
          return Form(
            child: Wrap(runSpacing: 15, children: <Widget>[
              firstnameField(),
              lastnameNameField(),
              emailField(),
            languageField(),
              notificationZone(),
              submit(context)
            ]),
          );
  }

  Widget firstnameField() {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.firstname != current.firstname
            || current.action == SettingsAction.reloadForLanguage,
        builder: (context, state) {
          return TextFormField(
              controller: context.read<SettingsBloc>().firstNameController,
              onChanged: (value) { context.read<SettingsBloc>().add(FirstnameChanged(firstname: value)); },
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                  labelText:S.of(context).pageSettingsFormFirstname,
                  errorText: state.firstname.invalid ? FirstnameValidationError.invalid.invalidMessage : null));
        }
    );
  }

  Widget lastnameNameField() {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.lastname != current.lastname
            || current.action == SettingsAction.reloadForLanguage,
        builder: (context, state) {
          return TextFormField(
              controller: context.read<SettingsBloc>().lastNameController,
              onChanged: (value) { context.read<SettingsBloc>().add(LastnameChanged(lastname: value)); },
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                  labelText:S.of(context).pageSettingsFormLastname,
                  errorText: state.lastname.invalid ? LastnameValidationError.invalid.invalidMessage : null));
        }
    );
  }

  Widget emailField() {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.email != current.email
            || current.action == SettingsAction.reloadForLanguage,
        builder: (context, state) {
          return TextFormField(
              controller: context.read<SettingsBloc>().emailController,
              onChanged: (value) { context.read<SettingsBloc>().add(EmailChanged(email: value)); },
              keyboardType: TextInputType.text,
              decoration: InputDecoration(
                  labelText:S.of(context).pageSettingsFormEmail,
                  errorText: state.email.invalid ? EmailValidationError.invalid.invalidMessage : null));
        }
    );
  }
  Widget languageField() {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.language != current.language,
        builder: (context, state) {
           return Padding(
            padding: const EdgeInsets.only(left: 3.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Text(S.of(context).pageSettingsFormLanguages, style: Theme.of(context).textTheme.bodyText1,),
                DropdownButton<String>(
                    value: state.language,
                    onChanged: (value) { context.read<SettingsBloc>().add(LanguageChanged(language: value!)); },
                    items: createDropdownLanguageItems(Constants.languages)),
              ],
            ),
          );
        });
  }

  List<DropdownMenuItem<String>> createDropdownLanguageItems(Map<String, String> languages) {
    return languages.keys.map<DropdownMenuItem<String>>((String key) =>
            DropdownMenuItem<String>(value: key, child: Text(languages[key]!)))
        .toList();
  }

  submit(BuildContext context) {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.formStatus != current.formStatus,
        builder: (context, state) {
        return ElevatedButton(
          child: Container(
              width: MediaQuery.of(context).size.width,
              child: Center(
                child: Visibility(
                  replacement: CircularProgressIndicator(value: null),
                  visible: !state.formStatus.isSubmissionInProgress,
                  child: Text(S.of(context).pageSettingsFormSave.toUpperCase()),
                ),
              )),
          onPressed: state.formStatus.isValidated ? () => context.read<SettingsBloc>().add(FormSubmitted()) : null,
        );
      }
    );
  }

  Widget notificationZone() {
    return BlocBuilder<SettingsBloc, SettingsState>(
        buildWhen: (previous, current) => previous.formStatus != current.formStatus,
        builder: (context, state) {
          return Visibility(
              visible: state.formStatus.isSubmissionFailure ||  state.formStatus.isSubmissionSuccess,
              child: Center(
                child: generateNotificationText(state, context),
              ));
        });
  }

  Widget generateNotificationText(SettingsState state, BuildContext context) {
    String notificationTranslated = '';
    Color? notificationColors;
    if(state.generalNotificationKey.compareTo(SettingsBloc.successKey) == 0) {
      notificationTranslated =S.of(context).pageSettingsSave;
      notificationColors = Theme.of(context).primaryColor;
    } else if(state.generalNotificationKey.compareTo(HttpUtils.errorServerKey) == 0) {
      notificationTranslated =S.of(context).genericErrorBadRequest;
      notificationColors = Theme.of(context).errorColor;
    } else if (state.generalNotificationKey.compareTo(HttpUtils.errorServerKey) == 0) {
      notificationTranslated =S.of(context).genericErrorServer;
      notificationColors = Theme.of(context).errorColor;
    }

    return Text(
      notificationTranslated,
      style: TextStyle(color: notificationColors),
    );
  }
}
