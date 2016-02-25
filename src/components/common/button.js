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
				underlayColor={'#196e3d'}
				onPress={this.props.onPress}
			>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
});

var styles = StyleSheet.create({
	button: {
		paddingTop: 10,
		paddingRight: 15,
		paddingBottom: 10,
		paddingLeft: 15,
		marginTop: 10,
		backgroundColor: '#208e4e',
	},
	buttonText: {
		flex: 1,
		color: '#ffffff',
		alignSelf: 'center'
	}
});