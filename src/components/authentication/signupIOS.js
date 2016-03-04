'use strict';
var React = require('react-native');

var {
	TouchableHighlight,
	StatusBarIOS,
	StyleSheet,
	ScrollView,
	TextInput,
	Image,
	View,
	Text
} = React;

var Parse = require('parse/react-native').Parse;
var Icon = require('react-native-vector-icons/MaterialIcons');

var Home = require('../inapp/homeIOS');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			username: '',
			password: '',
			passwordConfirmation: '',
			error: '',
			errorUsername: '',
			errorPassword: '',
		}
	},
	render: function(){
		var _this = this;
		StatusBarIOS.setStyle('default');
		return (
			<View style={styles.container}>
				<View style={styles.masthead}>
					<Icon name="explore" size={40} color="#1abc9c" style={{alignSelf: 'center'}} />
				</View>
				<Text style={styles.welcomeTitle}>You'll need a username.</Text>
				<Text style={styles.welcomeSubtitle}>Make sure it's 6 characters or more.</Text>
				<View style={styles.inputWrapper}>
					<TextInput 
						style={styles.input} 
						value={this.state.username} 
						onChangeText={(text) => this.setState({username: text, errorUsername: ''})} 
						autoCapitalize={'none'}
						autoCorrect={false}
						placeholder={'username'}
					>
					</TextInput>
				</View>
				<Text style={styles.errorMessage}>{this.state.errorUsername}</Text>
				<Text style={styles.welcomeTitle}>And a password.</Text>
				<Text style={styles.welcomeSubtitle}>8 characters long with one special character.</Text>
				<View style={styles.inputWrapper}>
					<TextInput 
						style={styles.input} 
						value={this.state.password} 
						onChangeText={(text) => this.setState({password: text, errorPassword: ''})} 
						autoCapitalize={'none'}
						autoCorrect={false}
						placeholder={'password'}
						password={true}
					>
					</TextInput>
				</View>
				<Text style={styles.errorMessage}>{this.state.errorPassword}</Text>
				<TouchableHighlight 
					underlayColor={'rgba(0,0,0,0.2)'}
					onPress={this.onSignUpPress}
				>
					<Text style={styles.signUpAction}>Sign up</Text>
				</TouchableHighlight>
				<Text style={[styles.errorMessage, {alignSelf: 'center'}]}>{this.state.error}</Text>
				<Text 
					style={styles.backLink}
					onPress={this.onGoBackPress}
				>
					Go back
				</Text>
			</View>
		);
	},
	onGoBackPress: function(){
		this.props.navigator.pop();
	},
	onSignUpPress: function(){

		if(this.state.username===""){
			return this.setState({
				errorUsername: 'Please enter a username.'
			});
		}		
		if(this.state.password===""){
			return this.setState({
				errorPassword: 'You forgot to set the password!'
			});
		}

		Parse.User.logOut();

		var user = new Parse.User();
		user.set('username', this.state.username);
		user.set('password', this.state.password);
		console.log('calling api...');
		user.signUp(null, {
			success: (user) => { console.log(user);this.props.navigator.resetTo({title: 'Home', component: Home}); },
			error: (user, error) => { console.log(error);this.setState({ error: error.message }) }
		});
		//this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#ffffff'
	},
	h1:{
		fontSize: 30,
		color: '#ffffff',
		marginBottom: 20,
		alignSelf: 'center',
		fontStyle: 'italic'
	},
	masthead: {
		paddingBottom: 30
	},	
	input: {
		height: 33,
		fontSize: 15
	},
	inputWrapper: {
		marginTop: 35,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc'
	},
	errorMessage: {
		color: '#ff7f7f',
		marginTop: 10,
		marginBottom: 15
	},
	backLink: {
		color: '#ccc',
		alignSelf: 'center',
		marginTop: 15
	},
	logo: {
		width: 60,
		height: 60,
		alignSelf: 'center'
	},
	welcomeTitle:{
		fontSize: 21,
		marginBottom: 7
	},
	welcomeSubtitle: {
		color: '#444444'
	},
	footer: {
		flex: 1,
		backgroundColor: '#cccccc',
		position: 'absolute',
		bottom: 40,
		left: 20,
		right: 20,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.1)',
	},
	footerInner:{
		flex: 1,
		position: 'absolute',
		bottom: 10,
		right: 20,
	},
	nextButton: {
		backgroundColor: '#1abc9c',
		paddingTop: 3,
		paddingRight: 10,
		paddingBottom: 3,
		paddingLeft: 10,
		borderRadius: 3,
		alignSelf: 'flex-end'
	},
	nextButtonText: {
		color: '#ffffff',
		fontWeight: 'bold'
	},
	signUpAction: {
		fontSize: 20,
		alignSelf: 'center',
		margin: 10		
	}
});