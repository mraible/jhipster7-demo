part of 'main_bloc.dart';


class MainState extends Equatable {
  final User currentUser;

  const MainState({
    this.currentUser = const User('', '', '', '', '', ''),
  });

  MainState copyWith({
    User? currentUser,
  }) {
    return MainState(
      currentUser: currentUser ?? this.currentUser,
    );
  }

  @override
  List<Object> get props => [currentUser];

  @override
  bool get stringify => true;
}
