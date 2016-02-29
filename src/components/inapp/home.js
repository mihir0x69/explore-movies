'use strict';
import React, {
  PullToRefreshViewAndroid,
  ToolbarAndroid,
  TouchableHighlight,
  AppRegistry,
  ScrollView,
  StyleSheet,
  TextInput,
  ListView,
  Image,
  Text,
  View
} from 'react-native';

var Moment = require('moment');

// var REQUEST_URL = 'http://api.themoviedb.org/3/search/movie?api_key=01082f35da875726ce81a65b79c1d08c&query=batman';
var REQUEST_URL = 'http://api.themoviedb.org/3/movie/upcoming?api_key=01082f35da875726ce81a65b79c1d08c';

module.exports = React.createClass({
  getInitialState: function(){
    return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loaded: false,
        isRefreshing: false,
        isEnabled: true,
        searchIcon: 'search'
    }
  },
  render: function(){
    var _scrollView: ScrollView;

    if(!this.state.loaded){
      return this.renderLoadingView();
    } 

    return (
        <View style={styles.container}>
          <ToolbarAndroid 
            navIcon={require('../../../assets/images/local_movies_white_108x108.png')}
            title="Upcoming"
            titleColor='#ffffff'
            style={styles.toolbar}
            actions={[{title: 'About App', show: 'never'}, {title: 'Settings', show: 'never'}, {title: 'Logout', show: 'never'}]}
          >
          </ToolbarAndroid>
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
    );
  },
  componentDidMount: function(){
    //this.fetchData();
    setTimeout(this.fetchData, 3000);
  },
  fetchData: function(){

    this.setState({ isRefreshing: true, isEnabled: false })
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
          isRefreshing: false,
          isEnabled: true
        });
      })
      .done();
  },
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <ToolbarAndroid 
          navIcon={require('../../../assets/images/local_movies_white_108x108.png')}
          title="Upcoming"
          titleColor='#ffffff'
          style={styles.toolbar}
        >
        </ToolbarAndroid>
        <View style={styles.loader}>
          <Image 
            source={require('../../../assets/images/load3.gif')}
            style={styles.loaderImage}
          />
        </View>
      </View>
    );
  },
  renderMovie: function(movie){
    return (
      <TouchableHighlight>
      <View style={styles.itemWrapper}>
        <View>
          <Image 
            // source={require('../../../assets/images/reload9.jpg')} 
            source={{uri: "https://image.tmdb.org/t/p/w185" + movie.poster_path} || require('../../../assets/images/blank.jpg')}
            style={styles.thumbnail} 
          />              
        </View>
        <View style={styles.rightPane}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{this.formatDate(movie.release_date)}</Text>
          <Text style={styles.desc}>{this.limitDesc(movie.overview)}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },
  limitDesc: function(str){
    if(str.length > 300){
      return str.substring(0, 300) + "...";
    }
    return str;
  },
  formatDate: function(date){
    return Moment(date).format('dddd, MMMM Do YYYY');
  },
  handleSearchPress: function(){

  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#002133',
    flex: 1,    
  },
  navbarTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#002133',
    padding: 10
  },
  rightPane: {
    flex: 1
  },
  header: {
    fontSize: 150
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
    color: '#ffffff'
  },
  year: {
    color: '#72c6ed',
    marginLeft: 15
  },
  desc: {
    fontSize: 10,
    color: '#cccccc',
    marginLeft: 15
  },
  thumbnail: {
    width: 81,
    height: 120
  },
  listView:{
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002133'
  },
  loaderImage: {
    width: 200,
    height: 150
  },
  input: {
    padding: 4,
    fontSize: 22,
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderLeftColor: 'transparent',
  },
  toolbar:{
    height: 55,
    backgroundColor: '#27ae60',
  }  
});

AppRegistry.registerComponent('listviewDemo', () => listviewDemo);