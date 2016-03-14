var React = require('react-native');

var {
	TouchableHighlight,
	RefreshControl,
	StatusBarIOS,
	ScrollView,
	StyleSheet,
	TabBarIOS,
	ListView,
	Image,
	View,
	Text
} = React;


var _this;
var HomeView = require('./home_viewsIOS/home');
var SignIn = require('../authentication/signinIOS');
var SearchView = require('./home_viewsIOS/search');
var Icon = require('react-native-vector-icons/Ionicons');
var PopularMovies = require('./popularIOS');
var FBLoginManager = require('NativeModules').FBLoginManager;

var TABS = {
	upcoming: 'upcoming',
	search: 'search',
	popular: 'popular',
	watchlist: 'watchlist',
	logout: 'logout'
}

module.exports = React.createClass({

	getInitialState: function(){
    	return {
        	selectedTab: TABS.upcoming
    	}
  	},
	render: function(){
		_this=this;
		StatusBarIOS.setStyle('default');
		return(
				<TabBarIOS translucent={true}>
					<Icon.TabBarItem
						title="Upcoming"
						iconName="arrow-graph-up-right"
						selectedIconName="arrow-graph-up-right"
						onPress={()=>this.setState({selectedTab: TABS.upcoming})}
						selected={this.state.selectedTab === TABS.upcoming}
					>
						{this._renderHome()}
					</Icon.TabBarItem>
					<Icon.TabBarItem
						title="Search"
						iconName="ios-search"
						selectedIconName="ios-search-strong"
						onPress={()=>this.setState({selectedTab: TABS.search})}
						selected={this.state.selectedTab === TABS.search}
					>
						{this._renderSearch()}
					</Icon.TabBarItem>					
					<Icon.TabBarItem
						title="Popular"
						iconName="android-star-outline"
						selectedIconName="android-star"
						onPress={()=>this.setState({selectedTab: TABS.popular})}
						selected={this.state.selectedTab === TABS.popular}
					>
						{this._renderPopular()}
					</Icon.TabBarItem>
					<Icon.TabBarItem
						title="Watchlist"
						iconName="ios-list-outline"
						selectedIconName="ios-list"
						onPress={()=>this.setState({selectedTab: TABS.watchlist})}
						selected={this.state.selectedTab === TABS.watchlist}
					>
						{this._renderBlank('Your Watchlist')}
					</Icon.TabBarItem>
					<Icon.TabBarItem
						title="Logout"
						iconName="log-out"
						selectedIconName="log-out"
						onPress={this._logout}
						selected={this.state.selectedTab === TABS.logout}
					>
					</Icon.TabBarItem>					
				</TabBarIOS>
		)
	},

  	_renderHome: function(){
  		return(
  			<HomeView navigator={this.props.navigator} />
  		)
  	},
  	_renderSearch: function(){
  		return(
  			<SearchView navigator={this.props.navigator} />
  		)
  	},
  	_renderPopular: function(){
  		return(
  			<PopularMovies navigator={this.props.navigator} />
  		)
  	},  	
  	_renderBlank: function(welcomeTitle){
  		return(
  			<View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
  				<Text>{welcomeTitle}</Text>
			</View>
  		)
  	},
  	_logout: function(){
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
  	},
  	_onChangeSearchText(text){
  		return;
		var _this = this;
		text = text.replace(/(^\s+|\s+$)/g, '');

		if(text==="" || text.length<2){
			return;
		}

		if(lastValue!==text){
			lastValue = text;
			if(timeout){ clearTimeout(timeout)}
			timeout = setTimeout(function(){
				_this.setState({ loaded: false })
				API.getSearchResults(text)
					.then((data) => {
						console.log(data);
						_this.setState({ dataSource: _this.state.dataSource.cloneWithRows(data), loaded: true });
					})
					.done();
			}, 200);
		}
	},
});
	
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingTop: 20
	},
})