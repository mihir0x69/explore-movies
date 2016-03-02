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

module.exports = React.createClass({

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
	              <TouchableHighlight underlayColor={'#eaeaea'}>
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
				ref={'DRAWER'}
			>
				<View style={styles.container}>
					<ToolBarAfterLoad
						title={'Search'}
					    navigator={this.props.navigator}
					    sidebarRef={this}
					/>
			  		<ScrollView>
			  			<Text style={{alignSelf: 'center', margin: 10}}>Content goes here</Text>
			  		</ScrollView>
				</View>
			</DrawerLayoutAndroid>
    	);
	},
	showUpcomingMovies: function(){
		this.props.navigator.push({name: 'home'});
	}
});

var styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#eaeaea'
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
  }	
})