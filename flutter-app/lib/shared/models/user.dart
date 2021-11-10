import 'package:dart_json_mapper/dart_json_mapper.dart';

@jsonSerializable
class User {

  @JsonProperty(name: 'firstName')
  final String? firstName;

  @JsonProperty(name: 'lastName')
  final String? lastName;

  @JsonProperty(name: 'login')
  final String? login;

  @JsonProperty(name: 'email')
  final String? email;

  @JsonProperty(name: 'password')
  final String? password;

  @JsonProperty(name: 'langKey')
  final String? langKey;

  const User(this.login, this.email, this.password, this.langKey,
      this.firstName, this.lastName);

  @override
  String toString() {
    return 'User{login: $login, email: $email, password: $password, langKey: $langKey}';
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is User &&
          runtimeType == other.runtimeType &&
          login == other.login &&
          email == other.email &&
          password == other.password &&
          langKey == other.langKey;

  @override
  int get hashCode =>
      login.hashCode ^ email.hashCode ^ password.hashCode ^ langKey.hashCode;
}
