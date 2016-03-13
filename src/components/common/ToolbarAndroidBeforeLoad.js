var React = require('react-native');
var StyleSheet = React.StyleSheet;
var ToolbarAndroid = React.ToolbarAndroid;

module.exports = React.createClass({
  render: function(){
		return(
        <ToolbarAndroid 
          navIcon={this.props.navIcon}
          title={this.props.title}
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