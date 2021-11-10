# Flickr

This application was generated using JHipster Flutter generator, you can find documentation at [https://github.com/merlinofcha0s/generator-jhipster-flutter](https://github.com/merlinofcha0s/generator-jhipster-flutter).

## Prerequisite

- [flutter-intl](https://plugins.jetbrains.com/plugin/13666-flutter-intl) IDE plugins for I18n if you use Android Studio or IntelliJ

## Development

Building the project:

1. Getting dependencies (You will only need to run this command when dependencies change in [pubspec.yaml](pubspec.yaml)) :

        flutter pub get

2. Running reflection (You will only need to run this command when you change DTOs or models) :

        flutter pub run build_runner build --delete-conflicting-outputs

3. Start the project (You can also start it with your IDE) :

        flutter run

4. Generate I18n in case you're **NOT** using Android studio or IntelliJ (Run it everytime you change something in the [lib/l10n](lib/l10n) folder):

        flutter pub global run intl_utils:generate

## Resources

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our [online documentation](https://flutter.dev/docs), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
