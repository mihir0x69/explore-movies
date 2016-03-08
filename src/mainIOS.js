'use strict';
var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	NavigatorIOS,
	Navigator,
} = React;

var Parse = require('parse/react-native');

var SignIn = require('./components/authentication/signinIOS');
var SignUp = require('./components/authentication/signupIOS');
var Home = require('./components/inapp/homeIOS');
var TestDB = require('./components/inapp/testdb');
var Search = require('./components/inapp/search');

var ROUTES = {
	signin: SignIn,
	signup: SignUp,
	home: Home,
	testdb: TestDB,
	search: Search
};

module.exports = React.createClass({

	componentWillMount: function(){
		Parse.initialize("8RnG4TwkjtMskGOyU7e2HtGRz3xuD2fgmBPLZuqB", "L99rA684VbjA1Op5FkRbShEltCCKknzVHPnxIkLS");

	},
	renderScene: function(route, navigator){
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
				configureScene={ () => { return Navigator.SceneConfigs.PushFromRight; }}
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