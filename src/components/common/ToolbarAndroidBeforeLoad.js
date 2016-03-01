var React = require('react-native');
var StyleSheet = React.StyleSheet;
var ToolbarAndroid = React.ToolbarAndroid;

module.exports = React.createClass({
  render: function(){
		return(
        <ToolbarAndroid 
          navIcon={require('../../../assets/images/menu_white_54x54.png')}
          title="Upcoming"
          titleColor='#ffffff'
          style={styles.toolbar}
        >
        </ToolbarAndroid>
		)		
	}
});

var styles = StyleSheet.create({
  toolbar:{
    height: 55,
    backgroundColor: '#1abc9c',
  }	
});