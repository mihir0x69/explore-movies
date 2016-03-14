var React = require('react-native');
var {
	TouchableHighlight,
	StatusBarIOS,	
	StyleSheet,
	TextInput,
	Image,
	View,
	Text,
} = React;

var Parse = require('parse/react-native').Parse;
var SignUp = require('./signupIOS');
var Home = require('../inapp/homeIOS');

// var {NativeModules} = require('react-native');
// var FBLogin = require('react-native-facebook-login');
// var FBLoginManager = NativeModules.FBLoginManager;
// var FBLoginManager = require('NativeModules').FBLoginManager;

var Icon = require('react-native-vector-icons/MaterialIcons');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			username: '',
			password: '',
			success: false,
			error: ''
		};
	},	
	render: function(){
		var _this = this;
		StatusBarIOS.setStyle('light-content');
		return(
			<View style={styles.container}>
				<View style={styles.absoluteContainer}>
					<View style={styles.masthead}>
						<Icon name="explore" size={70} color="#fff" />
						<Text style={styles.h1}>explore movies</Text>
					</View>	
					<View style={styles.body}>
						<Text style={styles.inputDescriptor}>username</Text>
						<TextInput 
							style={styles.input} 
							value={this.state.username} 
							onChangeText={(text) => this.setState({username: text, error: ''})}
							autoCapitalize={'none'} 
							autoCorrect={false} 
							returnKeyType='next' 
							keyboardType={'email-address'}
						>
						</TextInput>
						<Text style={styles.inputDescriptor}>password</Text>
						<TextInput 
							style={styles.input} 
							value={this.state.password}
							password={true}
							onChangeText={(text) =>this.setState({password: text, error: ''})}
							autoCapitalize={'none'} 
						>
						</TextInput>
						<TouchableHighlight 
							underlayColor={'rgba(0,0,0,0.2)'}
							onPress={this.onSignInPress}
						>
							<Text style={styles.signInAction}>Sign in</Text>
						</TouchableHighlight>
						<Text 
							style={styles.signUpMessage} 
							onPress={this.onSignUpPress}
						>
							Don't have an account? Sign up!
						</Text>
					    <Text style={styles.errorMessage}>{this.state.error}</Text>
					</View>
				</View>
			</View>
		);
	},
	onSignUpPress: function(){
		this.props.navigator.push({name: 'signup'})
	},
	onSignInPress: function(){
		var _this = this;
		if(this.state.username===""){
			return this.setState({
				error: 'Username is missing.'
			});
		}
		if(this.state.password===""){
			return this.setState({
				error: 'Password is missing.'
			});
		}
		Parse.User.logIn(this.state.username, this.state.password, {
			success: (user) => { 
				_this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
				console.log(user); 
			},
			error: (data, error) => {
				console.log(error);
				var errorText;

				switch(error.code){
					case 101: 	errorText="Invalid username or password."
								break;
					case 100: 	errorText="Unable to connect to the internet."
								break;
					default : 	errorText="Something went wrong."
								break;
				}
				_this.setState({
					success: false,
					error: errorText,
					loader: HiddenLoader
				});
				console.log(data, error);
			}
		});		
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1abc9c'
	},
	absoluteContainer: {
		flex: 1,
		padding: 20,
	},
	masthead: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	body: {
		flex: 2,
	},
	h1:{
		fontSize: 30,
		color: '#ffffff',
		marginBottom: 20,
	},
	input: {
		padding: 4,
		marginBottom: 20,
		height: 45,
		fontSize: 22,
		color: '#ffffff',
		backgroundColor: 'rgba(255,255,255,0.3)',
		borderRadius: 5,
		textAlign: 'center'
	},
	inputDescriptor: {
		marginBottom: 10,
		alignSelf: 'center',
		color: '#ffffff'
	},
	signInAction:{
		color: '#ffffff',
		fontSize: 20,
		alignSelf: 'center',
		margin: 10
	},
	errorMessage: {
		color: '#FFF59D',
		marginTop: 10,
		alignSelf: 'center',
		textAlignVertical: 'center',
	},
	logo: {
		width: 60,
		height: 60
	},
	signUpMessage: {
		color: '#ffffff',
		alignSelf: 'center',
		margin: 15,
		fontSize: 16
	},
	fg_white:{
		color: '#ffffff'
	},
	loader: {
		height: 15,
		width: 15,
		alignSelf: 'center'
	},
	backgroundImage: {
		resizeMode: 'cover',
		position: 'absolute'
	}
})