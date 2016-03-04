'use strict';
var React = require('react-native');

var {
	TouchableHighlight,
	StatusBarIOS,
	StyleSheet,
	TextInput,
	Image,
	View,
	Text
} = React;

var Parse = require('parse/react-native').Parse;
var Icon = require('react-native-vector-icons/MaterialIcons');

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
					onChangeText={(text) => this.setState({username: text, error: ''})} 
					autoCapitalize={'none'}
					autoCorrect={false}
					placeholder={'username'}
				>
				</TextInput>
				</View>
				<Text style={styles.errorMessage}></Text>
				<Text 
					style={styles.backLink}
					onPress={this.onGoBackPress}
				>
					Go back
				</Text>
				<View style={styles.footer}>
				</View>
					<View style={styles.footerInner}>
					<TouchableHighlight style={styles.nextButton} underlayColor={'#117964'}>
						<Text style={styles.nextButtonText}>Next</Text>
					</TouchableHighlight>
					</View>

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
		padding: 30,
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
		marginTop: 10
	},
	backLink: {
		color: '#000000',
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
	}
});