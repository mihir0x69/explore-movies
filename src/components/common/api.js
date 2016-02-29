// var REQUEST_URL = 'http://api.themoviedb.org/3/search/movie?api_key=01082f35da875726ce81a65b79c1d08c&query=batman';
var React = require('react-native');

function sortByDate(a, b) {
    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
}

module.exports = {

	getUpcomingMovies: function(){
		var REQUEST_URL = 'http://api.themoviedb.org/3/movie/upcoming?api_key=01082f35da875726ce81a65b79c1d08c';
    	return fetch(REQUEST_URL)
      		.then((response) => response.json())
      		.then((responseData) => {
      			
	        	return responseData.results.sort(sortByDate);
			});
	},
};