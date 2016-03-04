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

var SearchBar = require('react-native-search-bar');
var API = require('../common/api');
var MovieItem = require('../common/MovieItemIOS');
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
        	dataSource: new ListView.DataSource({
	        	rowHasChanged: (row1, row2) => row1 !== row2
    		}),
        	loaded: false,
        	isRefreshing: false,
        	selectedTab: TABS.upcoming
    	}
  	},
	render: function(){
		StatusBarIOS.setStyle('default');

		if(!this.state.loaded){
      		return this.renderLoadingView();
    	}

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
	componentDidMount: function(){
    	this.fetchData();
    	//setTimeout(this.fetchData, 5000);
  	},
  	fetchData: function(){
  		this.setState({isRefreshing: true});
    	API.getUpcomingMovies()
    		.then((data) => {
	        	this.setState({
		          dataSource: this.state.dataSource.cloneWithRows(data),
		          loaded: true,
		          isRefreshing: false
	        	});
    	});
  	},
	renderLoadingView: function(){
		return (
      		<View style={styles.container}>
        		<View style={styles.loader}>
          			<Image 
            			source={require('../../../assets/images/loaderIOS.gif')}
            			style={styles.loaderImage}
          			/>
        		</View>
      		</View>
    	);
	},
	renderMovie: function(movie){
	    return (
    	    <MovieItem movie={movie} />
    	);
  	},
  	_renderHome: function(){
  		return(
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl 
							refreshing={this.state.isRefreshing}
							onRefresh={this.fetchData}
							tintColor="#1abc9c"
						/>
					}
				>
                	<ListView 
                    	dataSource={this.state.dataSource}
                    	renderRow={this.renderMovie}
                    	style={styles.listView}
                    >
                  	</ListView> 
				</ScrollView>  		
			</View>
  		);
  	},
  	_renderSearch: function(){
  		return(
  			<View style={styles.container}>
				<SearchBar
					placeholder="Search"
				 />
			</View>
  		)
  	},
  	_renderBlank: function(welcomeTitle){
  		return(
  			<View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
  				<Text>{welcomeTitle}</Text>
			</View>
  		)
  	}
});
	
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingTop: 20
	},
	loader: {
	    flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: '#ffffff'
  	},
	loaderImage: {
		width: 200,
    	height: 150
	}
})