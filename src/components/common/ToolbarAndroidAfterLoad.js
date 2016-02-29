var React = require('react-native');
var StyleSheet = React.StyleSheet;
var ToolbarAndroid = React.ToolbarAndroid;

module.exports = React.createClass({
	render: function(){
		return(
			<ToolbarAndroid
          		navIcon={require('../../../assets/images/local_movies_white_108x108.png')}
            	title="Upcoming"
            	titleColor='#ffffff'
            	style={styles.toolbar}
            	actions={[{title: 'About App', show: 'never'}, {title: 'Settings', show: 'never'}, {title: 'Logout', show: 'never'}]}
          	>
          	</ToolbarAndroid>			
		)		
	}
});

var styles = StyleSheet.create({
  toolbar:{
    height: 55,
    backgroundColor: '#27ae60',
  }	
})