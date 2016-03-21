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

var API = require('../common/api');
var Moment = require('moment');

var placeholderImage;

module.exports = React.createClass({

	getInitialState: function(){
		return{
			id: this.props.data.id,
			movie: null,
			temp: this.props.data.title,
			loaded: false
		}
	},
	componentDidMount: function(){
		API.getMovieDetails(this.state.id)
			.then(data =>{
				console.log(data);
				this.setState({ movie: data, loaded: true })
			});
	},
	render: function(){

	    if(!this.state.loaded){
	      return this.renderLoadingView();
	    }
		return(
			<View style={styles.container}>
	  			<View style={styles.backdropWrapper}>
            <Text style={styles.imageNotFoundText}>Oops! No backdrop found.</Text>
	  				<Image 
		  				resizeMode="cover" 
		  				source={{uri: "https://image.tmdb.org/t/p/w500" + this.state.movie.backdrop_path}} 
	  					style={styles.backdrop}
					>
	  				</Image>
	  			</View>				
		  		<ScrollView style={styles.content}>
		  			<Text style={styles.certificate}>{this.getCertificate() + " Rated"}</Text>
		  			<Text style={styles.year}>{this.formatDate(this.state.movie.release_date)}</Text>
		  			<Text style={styles.title}>{this.state.movie.title}</Text>
		  			<Text style={styles.description}>{this.state.movie.overview}</Text>
		  			<Text style={styles.votes}>{"Votes: " + this.state.movie.vote_average + "/10"}</Text>
		  		</ScrollView>
			</View>
    	);
	},
  	formatDate: function(date){
    	return Moment(date).format('MMMM Do, YYYY.');
  	},  
  	getCertificate: function(){
  		return this.state.movie.adult ? "A" : "U/A";
  	},
	renderLoadingView: function(){
		return (
      		<View style={styles.container}>
        		<View style={styles.loader}>
          			<Image 
            			source={require('../../../assets/images/loaderIOS.gif')}
            			style={styles.loaderImage}
          			/>
        		</View>
      		</View>
    	);		
	},  	
});

var styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#FFFFFF',
  },
  content: {
  	flex: 1,
  	padding: 10
  },
  loader: {
    flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#ffffff'
  },
  loaderImage: {
	width: 200,
	height: 150
  },  
  poster: {
  	width: 162,
  	height: 240
  },
  backdropWrapper: {
  	flex: 1,
  	justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  backdrop: {
  	position: 'absolute',
  	top: 0,
  	left: 0,
  	bottom: 0,
  	right: 0
  },
  description: {
  	color: '#111111',
  	fontSize: 13,
  	marginBottom: 5
  },
  year: {
  	fontSize: 15,
    color: '#72c6ed',
    marginBottom: 5
  },  
  votes: {
  	color: '#2b547e',
  	fontSize: 15,
  	fontWeight: 'bold',
  	marginBottom: 50
  },
  certificate:{
  	fontSize: 15,
  	color: '#222222'
  },
  title: {
  	color: '#000000',
  	fontSize: 20,
  	fontWeight: 'bold',
  	marginBottom: 5
  },
  imageNotFoundText: {
    color: '#cccccc'
  }  
});