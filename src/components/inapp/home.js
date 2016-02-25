'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

//var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var customData = require('../sampleData/data.json');

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

    if(!this.state.loaded){
      return this.renderLoadingView();
    } 

    return <ListView 
      dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView}
    />
  },
  componentDidMount: function(){
    setTimeout(this.fetchData, 3000);
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
        source={{uri: movie.posters.thumbnail}} 
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
    backgroundColor: '#F5FCFF'
  },
  rightPane: {
    flex: 1
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 20
  },
  year: {
    color: '#72c6ed',
    marginLeft: 20
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView:{
    backgroundColor: '#F5FCFF'
  },
  loader: {
    width: 50,
    height: 50
  }
});

AppRegistry.registerComponent('listviewDemo', () => listviewDemo);
