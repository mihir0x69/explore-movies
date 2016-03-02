'use strict';
var React = require('react-native');

var {
	StyleSheet,
	TextInput,
	Image,
	View,
	Text
} = React;

var Button = require('../common/button.js');
var Parse = require('parse/react-native').Parse;

// var Store = require('react-native-store');
// var DB = {
// 	users: Store.model('users')
// }

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
				<View style={styles.masthead}>
					<Image 
						style={styles.logo} 
						source={require('../../../assets/images/clear_all_white_144x144.png')}
					>
					</Image>			
					<Text style={styles.h1}>quick sign up</Text>
				</View>
				<Text style={styles.fg_white}>username</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.username} 
					onChangeText={(text) => this.setState({username: text, error: ''})} 
					autoCapitalize={'none'} 
				>
				</TextInput>
				<Text style={styles.fg_white}>password</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.password}
					secureTextEntry={true}
					onChangeText={(text) =>this.setState({password: text, error: ''})}
					autoCapitalize={'none'}
				>
				</TextInput>
				<Text style={styles.fg_white}>confirm password</Text>
				<TextInput 
					style={styles.input} 
					value={this.state.passwordConfirmation}
					secureTextEntry={true}
					onChangeText={(text) =>this.setState({passwordConfirmation: text, error: ''})}
					autoCapitalize={'none'}
				>
				</TextInput>
				<Button 
					text={'SIGN UP'} 
					onPress={this.onSignUpPress}
					onRelaxColor={'#117964'}
					onPressColor={'#08362d'}					
				>
				</Button>
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

		// DB.users.add({
		// 	username: this.state.username,
		// 	password: this.state.password
		// });

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
		backgroundColor: '#091D27'
	},
	h1:{
		fontSize: 30,
		color: '#ffffff',
		marginBottom: 20,
		alignSelf: 'center',
		fontStyle: 'italic'
	},
	masthead: {
		padding: 20,
	},	
	input: {
		padding: 4,
		height: 45,
		fontSize: 22,
		marginBottom: 20,
		color: '#bbbbbb'
	},
	errorMessage: {
		color: '#f1c40f',
		marginTop: 10,
		alignSelf: 'center',
		textAlignVertical: 'center'
	},
	backLink: {
		color: '#ffffff',
		alignSelf: 'center',
		marginTop: 15
	},
	logo: {
		width: 60,
		height: 60,
		alignSelf: 'center'
	},
	fg_white:{
		color: '#ffffff'
	}	
});