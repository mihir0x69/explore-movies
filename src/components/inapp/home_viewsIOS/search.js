var React = require('react-native');
var {
	StyleSheet,
	ScrollView,
	ListView,
	Image,
	View,
	Text
} = React;

var SearchBar = require('react-native-search-bar');
var DismissKeyboard = require('react-native-dismiss-keyboard');
var MovieItem = require('../../common/MovieItemIOS');
var API = require('../../common/api');

var lastValue="";
var timeout;

module.exports = React.createClass({

	getInitialState: function(){
		return{
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false,
			noResult: ''
		}
	},
	componentDidMount: function(){
		this.refs.searchBar.focus();
	},
	render: function(){
		return(
  			<View style={styles.container}>
				<SearchBar
					ref="searchBar"
					placeholder="What are you looking for?"
					onChangeText={(text) => this._onChangeSearchText(text)}
					showsCancelButton={true}
					onCancelButtonPress={this._dismissKeyboard}
					autoFocus={true}
				 />
				<ScrollView style={{flex: 1}}>
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
	renderMovie: function(movie){
	    return (
    	    <MovieItem movie={movie} />
    	);
  	},
  	_onChangeSearchText(text){
  		//console.log(text);
  		//return;
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
	_dismissKeyboard: function(){
		DismissKeyboard();
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingTop: 20
	},
})