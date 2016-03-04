'use strict';
var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	NavigatorIOS,
} = React;

var Parse = require('parse/react-native');

var SignIn = require('./components/authentication/signinIOS');
var SignUp = require('./components/authentication/signupIOS');
var Home = require('./components/inapp/homeIOS');
var TestDB = require('./components/inapp/testdb');
var Search = require('./components/inapp/search');

module.exports = React.createClass({

	componentWillMount: function(){
		Parse.initialize("8RnG4TwkjtMskGOyU7e2HtGRz3xuD2fgmBPLZuqB", "L99rA684VbjA1Op5FkRbShEltCCKknzVHPnxIkLS");

	},
	render: function(){
		return (
			<NavigatorIOS
                style={styles.container}
                initialRoute={{ title: "Sign In", component: Home, navigationBarHidden: true, translucent: true}} 
                translucent={true}
            />
		);
	}
});

var styles = StyleSheet.create({
	container:{
		flex: 1,
	}
});