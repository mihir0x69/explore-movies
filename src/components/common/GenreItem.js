var React = require('react-native');

var {
	TouchableHighlight,
	StyleSheet,
	View,
	Text
} = React;

module.exports = React.createClass({

	render: function(){
		return(
			<TouchableHighlight>
				<View style={styles.container}>
					<Text style={styles.title}>{this.props.genre}</Text>
				</View>
			</TouchableHighlight>
		)
	}
});

var styles = StyleSheet.create({
	container:{
		flex: 1,
		padding: 20
	},
	title: {
		color: '#ffffff',
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#ff0000'
	}
})