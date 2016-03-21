'use strict';
var React = require('react-native');

var {
  PullToRefreshViewAndroid,
  DrawerLayoutAndroid,
  TouchableHighlight,
  ViewPagerAndroid,
  ScrollView,
  StyleSheet,
  TextInput,
  ListView,
  Platform,
  Image,
  Text,
  View
} = React;


//grabbing required components 
var API = require('../common/api');

var VisibleLoader = require('../../../assets/images/rolling.gif');
var HiddenLoader = require('../../../assets/images/1x1.png');

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
        rawData: [],
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loaded: false,
        loader: HiddenLoader,
        isRefreshing: false,
        isEnabled: true,
        page: 1,
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
              <TouchableHighlight underlayColor={'#eaeaea'} onPress={this.showPopularMovies}>
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
          <ViewPagerAndroid style={styles.container} initialPage={0}>
            <View>
              <PullToRefreshViewAndroid 
                style={styles.container}
                refeshing={this.state.isRefreshing}
                onRefresh={this.reloadData}
                enabled={this.state.isEnabled}
              >
                <ScrollView>
                  <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}>
                  </ListView> 
                  <Text style={styles.loadMoreText} onPress={this.loadMoreMovies}>Load more movies</Text>
                  <View style={styles.loadMoreWrapper}><Image source={this.state.loader} style={styles.loadMoreIndicator}></Image></View>
                </ScrollView>
              </PullToRefreshViewAndroid>
            </View>
          </ViewPagerAndroid>
      </View>
      </DrawerLayoutAndroid>
    );
  },
  componentDidMount: function(){
    this.reloadData();
    //setTimeout(this.fetchData, 2000);
  },
  fetchData: function(page){
    this.setState({ isRefreshing: true, isEnabled: false, loader: VisibleLoader });
    console.log(page + ' inside fetchData')
    API.getUpcomingMovies(page)
    	.then((data) => {
	        this.setState({
              rawData: this.state.rawData.concat(data),
	          dataSource: this.state.dataSource.cloneWithRows(this.state.rawData.concat(data)),
	          loaded: true,
	          isRefreshing: false,
	          isEnabled: true,
              loader: HiddenLoader
	        });
    	});
  },
  reloadData: function(){
    this.setState({ isRefreshing: true, isEnabled: false, rawData: [], page: 1 });
    console.log(this.state.page + ' inside reloadData');
    API.getUpcomingMovies(this.state.page)
      .then((data) => {
          this.setState({
            rawData: this.state.rawData.concat(data),
            dataSource: this.state.dataSource.cloneWithRows(this.state.rawData.concat(data)),
            loaded: true,
            isRefreshing: false,
            isEnabled: true
          });
      });
  },
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <ToolbarBeforeLoad title="Upcoming" navIcon={require('../../../assets/images/menu_white_54x54.png')} />
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
        <MovieItem movie={movie} navigator={this.props.navigator} />
    );
  },
  loadMoreMovies: function(){
    var nextPage = this.state.page+1;
    this.setState({ 
      page: nextPage 
    });
    console.log(this.state.page + ' inside loadMoremovies');
    this.fetchData(nextPage);

    //this.componentDidMount();
  },
  openDrawer:function() {
    this.refs['DRAWER'].openDrawer();
  },
  showSearchMovies: function(){
    this.refs['DRAWER'].closeDrawer();
    this.props.navigator.push({name: 'search'});
  },
  showPopularMovies: function(){
    this.refs['DRAWER'].closeDrawer();
    this.props.navigator.push({name: 'popular'});
  },  
  showMovieGenres: function(){
    this.refs['DRAWER'].closeDrawer();
    this.props.navigator.push({name: 'genres'});
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091D27'
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
  },
  loadMoreText: {
    alignSelf: 'center', 
    color: '#ffffff', 
    paddingTop: 10
  },
  loadMoreWrapper: {
    padding: 10
  },
  loadMoreIndicator: {
    height: 15, 
    width: 15,
    alignSelf: 'center'
  }
});