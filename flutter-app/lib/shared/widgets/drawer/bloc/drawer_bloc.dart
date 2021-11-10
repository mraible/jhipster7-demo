import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:Flickr/account/login/login_repository.dart';

part 'drawer_events.dart';
part 'drawer_state.dart';

class DrawerBloc extends Bloc<DrawerEvent, DrawerState> {
  final LoginRepository _loginRepository;

  DrawerBloc({required LoginRepository loginRepository}) :
        _loginRepository = loginRepository, super(const DrawerState());

  @override
  void onTransition(Transition<DrawerEvent, DrawerState> transition) {
    super.onTransition(transition);
  }

  @override
  Stream<DrawerState> mapEventToState(DrawerEvent event) async* {
    if (event is Logout) {
       yield* onLogout(event);
    }
  }

  Stream<DrawerState> onLogout(Logout event) async* {
    await _loginRepository.logout();
    yield state.copyWith(isLogout: true);
  }
}
