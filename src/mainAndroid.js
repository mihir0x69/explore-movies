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

var SignIn = require('./components/authentication/signin');
var SignUp = require('./components/authentication/signup');
var Home = require('./components/inapp/home');
var TestDB = require('./components/inapp/testdb');
var Search = require('./components/inapp/search');
var Genres = require('./components/inapp/genres');
var Movie = require('./components/inapp/movie');
var Popular = require('./components/inapp/popular');

var ROUTES = {
	signin: SignIn,
	signup: SignUp,
	home: Home,
	testdb: TestDB,
	search: Search,
	genres: Genres,
	movie: Movie,
	popular: Popular
};

module.exports = React.createClass({

	componentWillMount: function(){
		Parse.initialize("8RnG4TwkjtMskGOyU7e2HtGRz3xuD2fgmBPLZuqB", "L99rA684VbjA1Op5FkRbShEltCCKknzVHPnxIkLS");

	},
	renderScene: function(route, navigator){
		// var data;
		// if(route.data==="mihir"){
		// 	data=route.data;
		// }
		// else{
		// 	data=''
		// }
		_navigator = navigator;
		var Component = ROUTES[route.name]; //ROUTES['signin'] => SignIn
		return (
			<Component 
				route={route} 
				navigator={navigator} 
				data={route.data}
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

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});