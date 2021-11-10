import 'package:Flickr/environment.dart';
import 'package:flutter/material.dart';
import 'app.dart';
import 'main.mapper.g.dart' show initializeJsonMapper;


void main() {
  Constants.setEnvironment(Environment.PROD);
  initializeJsonMapper();
  runApp(FlickrApp());
}
