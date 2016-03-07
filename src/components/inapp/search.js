var React = require('react-native');

var {
  DrawerLayoutAndroid,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  TextInput,
  ListView,
  Platform,
  Image,
  Text,
  View
} = React;

var ToolBarAfterLoad = require('../common/ToolbarAndroidAfterLoad');
var Icon = require('react-native-vector-icons/MaterialIcons');
var API = require('../common/api');
var MovieItem = require('../common/MovieItem');

var lastValue="";
var timeout;

module.exports = React.createClass({

	getInitialState: function(){
		return{
			dataSource: new ListView.DataSource({
          		rowHasChanged: (row1, row2) => row1 !== row2
        	}),
			loaded: true,
			noResult: ''
		}
	},
	render: function(){

	    var NavigationView = (
			<View style={styles.container}>
	        	<View style={styles.sidebarHeader}>
	           		<Image
	              		source={require('../../../assets/images/blurbg.jpg')}
	              		style={styles.sidebarBackground}
	              	>
	            	</Image>
	            	<View style={styles.absoluteContainer}>
	              		<Icon name="explore" size={50} color="#fff" />
	              		<Text style={styles.sidebarTitle}>Explore Movies</Text>            
	            	</View>
	          	</View>
	          	<View style={styles.sidebarBody}>
	              	<TouchableHighlight underlayColor={'#eaeaea'} onPress={this.showUpcomingMovies}>
		                <View style={styles.sidebarItemWrapper}>
							<Icon name="trending-up" size={25} color="#9FA8DA" />
	    	            	<Text style={styles.sidebarItem}>Upcoming Movies</Text>
	        	        </View>
	            	</TouchableHighlight>
	              	<TouchableHighlight underlayColor={'#eaeaea'}>
	                	<View style={styles.sidebarItemWrapper}>
	                  		<Icon name="stars" size={25} color="#9FA8DA" />
	                  		<Text style={styles.sidebarItem}>Popular Movies</Text>
	                	</View>
	              	</TouchableHighlight>              
	              	<TouchableHighlight underlayColor={'#eaeaea'}>
	                	<View style={styles.sidebarItemWrapper}>
	                  		<Icon name="list" size={25} color="#9FA8DA" />
	                  		<Text style={styles.sidebarItem}>My Watchlist</Text>
	                	</View>
	              	</TouchableHighlight>
	              	<TouchableHighlight underlayColor={'#eaeaea'} onPress={this.showMovieGenres}>
	                	<View style={styles.sidebarItemWrapper}>
	                  		<Icon name="bubble-chart" size={25} color="#9FA8DA" />
	                  		<Text style={styles.sidebarItem}>Movie Genres</Text>
	                	</View>
	              	</TouchableHighlight>
	          	</View>        
	        </View>      
	    );

		return(
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => NavigationView}
				keyboardDismissMode={'on-drag'}
				ref={'DRAWER'}
			>
				<View style={styles.container}>
					<ToolBarAfterLoad
						title={'Search'}
					    navigator={this.props.navigator}
					    sidebarRef={this}
					/>
			  		<View style={styles.searchBar}>
				  		<TextInput 
				  			placeholder={'What are you looking for?'}
				  			placeholderTextColor={'#138871'}
				  			style={styles.input}
				  			autoCapitalize={'none'}
				  			onChangeText={(text) => this._onChangeSearchText(text)}
				  			underlineColorAndroid={'#138871'}
				  			autoFocus={true}
				  		>
				  		</TextInput>
			  		</View>
			  		<ScrollView>
			  			<ListView
			  				style={{ flex: 1 }}
			  				dataSource={this.state.dataSource}
			  				renderRow={this.renderMovie}
			  			>
			  			</ListView>
			  		</ScrollView>
				</View>
			</DrawerLayoutAndroid>
    	);
	},
	_onChangeSearchText(text){

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
	renderMovie: function(movie){
	    return (
    	    <MovieItem movie={movie} />
    	);
  	},
  	showMovieGenres: function(){
    	this.refs['DRAWER'].closeDrawer();
    	this.props.navigator.push({name: 'genres'});
  	},
	showUpcomingMovies: function(){
		this.props.navigator.pop();
	}  	
});

var styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#091D27'
  },
  searchBar: {
  	paddingLeft: 13,
  	paddingRight: 13,
  	backgroundColor: '#1abc9c',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091D27'
  },
  loaderImage: {
    width: 200,
    height: 150
  },
  sidebarHeader: {
    flex: 1, 
    backgroundColor: '#c0392b',
  },
  sidebarBackground: {
    resizeMode: 'cover',
    position: 'absolute'
  },
  sidebarBody: {
    flex: 3,
    backgroundColor: '#fafafa'
  },
  sidebarItem: {
    fontSize: 15,
    color: '#777777',
    marginLeft: 15,
  },
  absoluteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  sidebarTitle: {
    color: '#ffffff',
    fontSize: 25,
  },
  sidebarItemWrapper: {
    flexDirection: 'row',
    padding: 15
  },
  input: {
	padding: 5,
	height: 40,
	fontSize: 15,
	color: '#ffffff',
	borderWidth: 1,
  },
})