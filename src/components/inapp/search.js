var React = require('react-native');

var {
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

var ToolBarOnlyBack = require('../common/ToolbarAndroidOnlyBack');
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
		}
	},
	render: function(){

		return(
				<View style={styles.container}>
					<ToolBarOnlyBack
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
    	    <MovieItem movie={movie} navigator={this.props.navigator} />
    	);
  	},
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
  input: {
	padding: 5,
	height: 40,
	fontSize: 15,
	color: '#ffffff',
	borderWidth: 1,
  },
})