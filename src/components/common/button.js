'use strict';
var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} = React;

module.exports = React.createClass({
	render: function(){
		return (
			<TouchableHighlight 
				style={styles.button} 
				underlayColor={'#1b99d5'}
				onPress={this.props.onPress}
			>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
});

var styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		paddingTop: 8,
		paddingRight: 15,
		paddingBottom: 8,
		paddingLeft: 15,
		marginTop: 10,
		backgroundColor: '#89cff0',
	},
	buttonText: {
		flex: 1,
		color: '#ffffff',
		alignSelf: 'center'
	}
});