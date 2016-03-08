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


var HomeView = require('./home_viewsIOS/home');
var SearchView = require('./home_viewsIOS/search');
var Icon = require('react-native-vector-icons/Ionicons');
var TABS = {
	upcoming: 'upcoming',
	search: 'search',
	popular: 'popular',
	watchlist: 'watchlist',
	settings: 'settings'
}

module.exports = React.createClass({

	getInitialState: function(){
    	return {
        	selectedTab: TABS.search
    	}
  	},
	render: function(){
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
						{this._renderBlank('Popular Movies')}
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
						title="Settings"
						iconName="ios-gear-outline"
						selectedIconName="ios-gear"
						onPress={()=>this.setState({selectedTab: TABS.settings})}
						selected={this.state.selectedTab === TABS.settings}
					>
						{this._renderBlank('Settings')}
					</Icon.TabBarItem>					
				</TabBarIOS>
		)
	},

  	_renderHome: function(){
  		return(
  			<HomeView />
  		)
  	},
  	_renderSearch: function(){
  		return(
  			<SearchView />
  		)
  	},
  	_renderBlank: function(welcomeTitle){
  		return(
  			<View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
  				<Text>{welcomeTitle}</Text>
			</View>
  		)
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