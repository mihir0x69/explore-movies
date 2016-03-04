'use strict';
var React = require('react-native');
var AppRegistry = React.AppRegistry;

var Main = require('./src/mainAndroid.js');

AppRegistry.registerComponent('commonDemo', () => Main);