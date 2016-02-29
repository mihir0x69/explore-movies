'use strict';
var React = require('react-native');
var {
	AppRegistry,
	BackAndroid,
	StyleSheet,
	Navigator,
} = React;

var _navigator;

var ToolbarAndroid = require('ToolbarAndroid');

var Parse = require('parse/react-native');

var SignIn = require('./components/authentication/signin.js');
var SignUp = require('./components/authentication/signup.js');
var Home = require('./components/inapp/home.js');
var ROUTES = {
	signin: SignIn,
	signup: SignUp,
	home: Home
};

module.exports = React.createClass({

	componentWillMount: function(){
		Parse.initialize("8RnG4TwkjtMskGOyU7e2HtGRz3xuD2fgmBPLZuqB", "L99rA684VbjA1Op5FkRbShEltCCKknzVHPnxIkLS");

	},
	renderScene: function(route, navigator){
		_navigator = navigator;
		var Component = ROUTES[route.name]; //ROUTES['signin'] => SignIn
		return (
			<Component 
				route={route} 
				navigator={navigator} 
			/>
		);
	},
	render: function(){
		return (
			<Navigator 
				style={styles.container} 
				initialRoute={{ name: 'signin', index: 0 }} 
				renderScene={ this.renderScene } 
				configureScene={ () => { return Navigator.SceneConfigs.HorizontalSwipeJump; }}
			>
			</Navigator>
		);
	}
});

var styles = StyleSheet.create({
	container:{
		flex: 1,
	}
});

// RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT, function() {
//   var invokeDefault = true;
//   _backPressSubscriptions.forEach((subscription) => {
//     if (subscription()) {
//       invokeDefault = false;
//     }
//   });
//   if (invokeDefault) {
//     BackAndroid.exitApp();
//   }
// });

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});