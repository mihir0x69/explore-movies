'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var customData = require('../sampleData/data.json');

module.exports = React.createClass({
  getInitialState: function(){
    return {
        requestUrl: 'http://www.omdbapi.com/?y=2016',
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
      <View style={styles.scrollView}>
        <View>
          <Text style={styles.heading}>movie feed</Text>
        </View>
        <ScrollView
          ref={(scrollView) => { _scrollView = ScrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          >
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
          <Text style={styles.header}>Hi</Text>
        </ScrollView>
      </View>
    );
  },
  componentDidMount: function(){
    this.fetchData();
    // setTimeout(this.fetchData, 3000);
  },
  fetchData: function(){

    //var data = customData.json();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(customData.movies),
      loaded: true
    });

    // fetch(REQUEST_URL)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    //       loaded: true
    //     });
    //   })
    //   .done();
  },
  renderLoadingView: function(){
    return <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/load.gif')}
        style={styles.loader}
      />
    </View>;
  },
  renderMovie: function(movie){
    return <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/reload9.jpg')} 
        style={styles.thumbnail} 
      />    
      <View style={styles.rightPane}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>
      </View>
    </View>;
  } 
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  rightPane: {
    flex: 1
  },
  header: {
    fontSize: 150
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15
  },
  year: {
    color: '#72c6ed',
    marginLeft: 20
  },
  thumbnail: {
    width: 81,
    height: 120
  },
  listView:{
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  loader: {
    width: 50,
    height: 50
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    flex: 1
  },
});

AppRegistry.registerComponent('listviewDemo', () => listviewDemo);
