'use strict';
import React, {
  PullToRefreshViewAndroid,
  AppRegistry,
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
          <ToolBarAfterLoad />
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
    this.fetchData();
    //setTimeout(this.fetchData, 5000);
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
});

AppRegistry.registerComponent('listviewDemo', () => listviewDemo);