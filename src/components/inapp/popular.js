'use strict';
var React = require('react-native');
var {
	StyleSheet,
	ScrollView,
	ListView,
	Image,
	Text,
	View
} = React;

var ToolBarOnlyBack = require('../common/ToolbarAndroidOnlyBack');
var ToolbarBeforeLoad = require('../common/ToolbarAndroidBeforeLoad');
var API = require('../common/api');
var MovieItem = require('../common/MovieItem');

module.exports = React.createClass({

	getInitialState: function(){
		return{
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !==row2
			}),
			loaded: false
		}
	},
	componentDidMount: function(){
		API.getPopularMovies()
			.then((data) => {
				this.setState({ 
					dataSource: this.state.dataSource.cloneWithRows(data),
					loaded: true
				});
				console.log(data);
			});
	},
	render: function(){
		if(!this.state.loaded){
      		return this.renderLoadingView();
    	} 

		return(
			<View style={styles.container}>
				<ToolBarOnlyBack
					title={'Popular Movies'}
				    navigator={this.props.navigator}
				    sidebarRef={this}
				/>
		  		<ScrollView>
		  			<ListView
		  				style={{ flex: 1 }}
		  				dataSource={this.state.dataSource}
		  				renderRow={this.renderMovie}
		  			>
		  			</ListView>
		  		</ScrollView>
			</View>
    	);
	},
	fetchData: function(){

	},
  	renderLoadingView: function(){
    	return (
      		<View style={styles.container}>
        		<ToolbarBeforeLoad title="Popular Movies" navIcon={require('../../../assets/images/arrow_back_white_54x54.png')} />
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
});

var styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#091D27'
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
})