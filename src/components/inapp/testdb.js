var React = require('react-native');

var {
	StyleSheet,
	View,
	Text
} = React;

var Store = require('react-native-store');

var DB = {
	users: Store.model('users')
};

module.exports = React.createClass({
	getInitialState: function(){
		return{
			items: null,
			string: ''
		}
	},
	componentDidMount: function(){
		DB.users.find()
			.then((response) => this.setState({ items: response, string: JSON.stringify(response) }));
	},
	render: function(){
		return(
			<View style={styles.container}>
				<Text onPress={this.onButtonPress}>Add Item</Text>
				<Text onPress={this.destroyData}>Destroy</Text>
				<Text>{this.state.string}</Text>
			</View>
		);
	},
	onButtonPress: function(){
		console.log('adding item...');

		var random = Math.random() * 2; 
		random = random.toFixed(2) + ' ';
		DB.foo.add({
			fname: random + ' fname',
			lname: random + ' lname'
		})
		.then((response) => {
			this.setState({ items: response, string: JSON.stringify(response) });
			console.log(response);
		});
	},
	destroyData: function(){
		console.log('destroying data...');
		DB.users.destroy()
			.then((response) => console.log(response));
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eaeaea',
		alignItems: 'center',
		justifyContent: 'center'
	}
});