import 'package:dart_json_mapper/dart_json_mapper.dart';
import 'package:Flickr/shared/models/user.dart';
import 'package:Flickr/shared/repository/http_utils.dart';

class AccountRepository {
  AccountRepository();

  Future<String?> register(User newUser) async {
    final registerRequest =
    await HttpUtils.postRequest<User>("/register", newUser);

    String? result;

    if (registerRequest.statusCode == 400) {
      result = registerRequest.headers[HttpUtils.errorHeader];
    } else {
      result = HttpUtils.successResult;
    }

    return result;
  }

  Future<User> getIdentity() async {
    final saveRequest = await HttpUtils.getRequest("/account");
    return JsonMapper.deserialize<User>(saveRequest.body);
  }

  Future<String?> saveAccount(User user) async {
    final saveRequest = await HttpUtils.postRequest<User>("/account", user);
    String? result;
    if (saveRequest.statusCode != 200) {
      if(saveRequest.headers[HttpUtils.errorHeader] != null) {
        result = saveRequest.headers[HttpUtils.errorHeader];
      } else {
        result = HttpUtils.errorServerKey;
      }
    } else {
      result = HttpUtils.successResult;
    }

    return result;
  }
}
