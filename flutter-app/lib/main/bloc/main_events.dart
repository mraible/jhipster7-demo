part of 'main_bloc.dart';

abstract class MainEvent extends Equatable {
  const MainEvent();

  @override
  List<Object> get props => [];

  @override
  bool get stringify => true;
}

class Init extends MainEvent {}
