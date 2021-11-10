import 'package:Flickr/shared/models/jwt_token.dart';
import 'package:Flickr/shared/models/user_jwt.dart';
import 'package:Flickr/shared/repository/http_utils.dart';
import 'package:dart_json_mapper/dart_json_mapper.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginRepository {
  LoginRepository();

  Future<JWTToken> authenticate(UserJWT userJWT) async {
    final authenticateRequest = await HttpUtils.postRequest<UserJWT>("/authenticate", userJWT);
    return JsonMapper.deserialize<JWTToken>(authenticateRequest.body);
  }

  Future<void> logout() async {
    FlutterSecureStorage storage = new FlutterSecureStorage();
    await storage.delete(key: HttpUtils.keyForJWTToken);
  }
}
