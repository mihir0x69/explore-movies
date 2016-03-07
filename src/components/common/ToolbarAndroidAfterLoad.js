var React = require('react-native');
var StyleSheet = React.StyleSheet;
var ToolbarAndroid = React.ToolbarAndroid;
var FBLoginManager = require('NativeModules').FBLoginManager;


module.exports = React.createClass({
	render: function(){
		return(
			<ToolbarAndroid
          		navIcon={require('../../../assets/images/menu_white_54x54.png')}
            	title={this.props.title}
            	titleColor='#ffffff'
            	style={styles.toolbar}
            	actions={[{title: 'About App', show: 'never'}, {title: 'Settings', show: 'never'}, {title: 'Logout', show: 'never'}]}
            	onActionSelected={this.onActionSelected}
            	onIconClicked={this.onIconClicked}
          	>
          	</ToolbarAndroid>			
		)		
	},
	onActionSelected: function(position){
		if(position === 2){
			var _this = this;
			FBLoginManager.logout(function(error, data){
				if (!error) {
			    	_this.props.onLogout && _this.props.onLogout();
			    } 
			    else {
			    	console.log(error, data);
			    }
			   });
			this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
		}
	},
	onIconClicked: function(){
		this.props.sidebarRef.refs['DRAWER'].openDrawer();
	}
});

var styles = StyleSheet.create({
  toolbar:{
    height: 55,
    backgroundColor: '#1abc9c',
  }	
})