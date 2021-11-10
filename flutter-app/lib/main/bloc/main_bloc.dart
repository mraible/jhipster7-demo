import 'dart:async';
import 'dart:ui';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:Flickr/generated/l10n.dart';
import 'package:Flickr/shared/models/user.dart';
import 'package:Flickr/shared/repository/account_repository.dart';

part 'main_events.dart';
part 'main_state.dart';

class MainBloc extends Bloc<MainEvent, MainState> {
  final AccountRepository _accountRepository;

  MainBloc({required AccountRepository accountRepository}) :
        _accountRepository = accountRepository, super(const MainState());

  @override
  void onTransition(Transition<MainEvent, MainState> transition) {
    super.onTransition(transition);
  }

  @override
  Stream<MainState> mapEventToState(MainEvent event) async* {
    if (event is Init) {
       yield* onInit(event);
    }
  }

  Stream<MainState> onInit(Init event) async* {
    User currentUser = await _accountRepository.getIdentity();

    if(currentUser.langKey!.compareTo(S.current.locale) != 0) {
      S.load(Locale(currentUser.langKey!));
    }

    yield state.copyWith(
      currentUser: currentUser,
    );
  }
}
