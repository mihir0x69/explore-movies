'use strict';
import React, {
  TouchableHighlight,
  AppRegistry,
  Component,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Moment = require('moment');

var customData = require('../sampleData/data.json');
// var REQUEST_URL = 'http://api.themoviedb.org/3/search/movie?api_key=01082f35da875726ce81a65b79c1d08c&query=batman';
var REQUEST_URL = 'http://api.themoviedb.org/3/movie/upcoming?api_key=01082f35da875726ce81a65b79c1d08c';

module.exports = React.createClass({
  getInitialState: function(){
    return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2
        }),
        loaded: false
    }
  },
  render: function(){
    var _scrollView: ScrollView;

    if(!this.state.loaded){
      return this.renderLoadingView();
    } 

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Movie Feed</Text>
          <Image 
            source={require('../../../assets/images/search_white_54x54.png')}
            style={styles.searchIcon}
          >
          </Image>
        </View>
        <ListView 
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          style={styles.listView}>
        </ListView>
      </View>
    );
  },
  componentDidMount: function(){
    //this.fetchData();
    setTimeout(this.fetchData, 5000);
  },
  fetchData: function(){

    //var data = customData.json();
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(customData.movies),
    //   loaded: true
    // });

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true
        });
      })
      .done();
  },
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Movie Feed</Text>
        </View>
        <View style={styles.loader}>
          <Image 
            source={require('../../../assets/images/load2.gif')}
            // resizeMode={'cover'}
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
            source={{uri: "https://image.tmdb.org/t/p/w185" + movie.poster_path}}
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
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    flex: 1,    
  },
  navbar: {
    backgroundColor: '#27ae60',
    paddingTop: 15,
    paddingLeft: 25,
    paddingBottom: 15,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent:  'space-between',
  },
  navbarTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#201F1E',
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
    backgroundColor: '#201F1E'
  },
  loaderImage: {
    width: 200,
    height: 150
  },
  searchIcon: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end'
  }
});

AppRegistry.registerComponent('listviewDemo', () => listviewDemo);