'use strict';
var React = require('react-native');
var AppRegistry = React.AppRegistry;

var Main = require('./src/mainIOS.js');

AppRegistry.registerComponent('commonDemo', () => Main);