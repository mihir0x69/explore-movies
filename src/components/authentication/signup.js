'use strict';
var React = require('react-native');

var {
	StyleSheet,
	TextInput,
	View,
	Text
} = React;

var Button = require('../common/button.js');
var Parse = require('parse/react-native').Parse;

module.exports = React.createClass({
	getInitialState: function(){
		return {
			username: '',
			password: '',
			passwordConfirmation: '',
			error: '',
			loggedIn: false
		}
	},
	render: function(){
		var _this = this;
		return (
			<View style={styles.container}>
				<Text style={styles.h1}>QUICK SIGN UP</Text>
				<Text>username</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.username} 
					onChangeText={(text) => this.setState({username: text, error: ''})} 
					autoCapitalize={'none'} 
				>
				</TextInput>
				<Text>password</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.password}
					secureTextEntry={true}
					onChangeText={(text) =>this.setState({password: text, error: ''})}
					autoCapitalize={'none'}
				>
				</TextInput>
				<Text>confirm password</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.passwordConfirmation}
					secureTextEntry={true}
					onChangeText={(text) =>this.setState({passwordConfirmation: text, error: ''})}
					autoCapitalize={'none'}
				>
				</TextInput>
				<Button text={'SIGN UP'} onPress={this.onSignUpPress}></Button>
				<Text 
					style={styles.backLink}
					onPress={this.onGoBackPress}
				>
					Go back
				</Text>
				<Text style={styles.errorMessage}>{this.state.error}</Text>
			</View>
		);
	},
	onGoBackPress: function(){
		this.props.navigator.pop();
	},
	onSignUpPress: function(){
		if(this.state.password==="" || this.state.passwordConfirmation==="" || this.state.username===""){
			return this.setState({
				error: 'All fields are mandatory.'
			});
		}
		if(this.state.password !== this.state.passwordConfirmation){
			return this.setState({
				error: 'Passwords do not match. Please try again.'
			});
		}

		Parse.User.logOut();

		var user = new Parse.User();
		user.set('username', this.state.username);
		user.set('password', this.state.password);
		console.log('calling api...');
		user.signUp(null, {
			success: (user) => { console.log(user);this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]); },
			error: (user, error) => { console.log(error);this.setState({ error: error.message }) }
		});
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	h1:{
		fontSize: 20,
		color: '#cccccc',
		marginBottom: 20
	},	
	input: {
		padding: 4,
		height: 40,
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#aeaeae'
	},
	errorMessage: {
		color: 'red',
		marginTop: 10,
		alignSelf: 'center',
		textAlignVertical: 'center'
	},
	backLink: {
		color: '#89cff0',
		alignSelf: 'center',
		marginTop: 15
	}	
});