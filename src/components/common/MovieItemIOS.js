var React = require('react-native');
var {
	TouchableHighlight,
	StyleSheet,
	Image,
	Text,
	View
} = React;

var Moment = require('moment');

module.exports = React.createClass({

	render: function(){
		var placeholderImage;

		if(!this.props.movie.poster_path){
			placeholderImage = require('../../../assets/images/blank.jpg');
		}
		else{
			placeholderImage = {uri: "https://image.tmdb.org/t/p/w185" + this.props.movie.poster_path};
		}
		return(
	      <TouchableHighlight onPress={this.respondToTouch}>
	      <View style={styles.itemWrapper}>
	        <View>
	          <Image 
	            source={placeholderImage}
	            style={styles.thumbnail} 
	          />              
	        </View>
	        <View style={styles.rightPane}>
	          <Text style={styles.title}>{this.props.movie.title}</Text>
	          <Text style={styles.year}>{this.formatDate(this.props.movie.release_date)}</Text>
	          <Text style={styles.desc}>{this.limitDesc(this.props.movie.overview)}</Text>
	        </View>
	      </View>
	      </TouchableHighlight>				
		)		
	},
  	formatDate: function(date){
    	return Moment(date).format('dddd, MMMM Do YYYY');
  	},
	limitDesc: function(str){
	  if(str.length > 200){
	    return str.substring(0, 200) + "...";
	  }
	  return str;
	},
	respondToTouch: function(){
		//console.log('tapped '+this.state.title);
		this.props.navigator.push({name: 'movie', data: {id: this.props.movie.id, title: this.props.movie.title }});
	}	
});

var styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  rightPane: {
    flex: 1,
    marginLeft: 15,
  },  
  thumbnail: {
    width: 81,
    height: 120
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#000000'
  },
  year: {
  	fontSize: 12,
    color: '#72c6ed',
  },
  desc: {
    fontSize: 10,
    color: '#333333',
  },    
})