'use strict';
import React, {
  PullToRefreshViewAndroid,
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
} from 'react-native';


//grabbing required components 
var API = require('../common/api');

var ToolbarBeforeLoad;
if(Platform.OS === 'android'){
  ToolbarBeforeLoad = require('../common/ToolbarAndroidBeforeLoad');
}

var ToolBarAfterLoad;
if(Platform.OS === 'android'){
  ToolBarAfterLoad = require('../common/ToolbarAndroidAfterLoad');
}

var MovieItem = require('../common/MovieItem');
var Icon = require('react-native-vector-icons/MaterialIcons');

//home
module.exports = React.createClass({
  getInitialState: function(){
    return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loaded: false,
        isRefreshing: false,
        isEnabled: true,
    }
  },
  render: function(){

    var _scrollView: ScrollView;

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
              <TouchableHighlight underlayColor={'#eaeaea'} onPress={this.showSearchMovies}>
                <View style={styles.sidebarItemWrapper}>
                  <Icon name="search" size={25} color="#9FA8DA" />
                  <Text style={styles.sidebarItem}>Search Movies</Text>
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

    if(!this.state.loaded){
      return this.renderLoadingView();
    } 

    return (

      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => NavigationView}
        ref={'DRAWER'}
      >
        <View style={styles.container}>
          <ToolBarAfterLoad
            title={'Upcoming'}
            navigator={this.props.navigator}
            sidebarRef={this}
          />
          <PullToRefreshViewAndroid 
            style={styles.container}
            refeshing={this.state.isRefreshing}
            onRefresh={this.fetchData}
            enabled={this.state.isEnabled}
          >
          <ScrollView>
            <ListView 
              dataSource={this.state.dataSource}
              renderRow={this.renderMovie}
              style={styles.listView}>
            </ListView> 
          </ScrollView>       
        </PullToRefreshViewAndroid>
      </View>
      </DrawerLayoutAndroid>
    );
  },
  componentDidMount: function(){
    this.fetchData();
    //setTimeout(this.fetchData, 2000);
  },
  fetchData: function(){
    this.setState({ isRefreshing: true, isEnabled: false });
    API.getUpcomingMovies()
    	.then((data) => {
	        this.setState({
	          dataSource: this.state.dataSource.cloneWithRows(data),
	          loaded: true,
	          isRefreshing: false,
	          isEnabled: true
	        });
    	});
  },
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <ToolbarBeforeLoad />
        <View style={styles.loader}>
          <Image 
            source={require('../../../assets/images/load4.gif')}
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
  openDrawer:function() {
    this.refs['DRAWER'].openDrawer();
  },
  showSearchMovies: function(){
    this.props.navigator.push({name: 'search'});
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#091D27',
    flex: 1
  },
  listView:{
    flex: 1,
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
  }
});