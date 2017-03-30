// example of flickr API call that returns data: 


//parts of the api request
function getFlickrApiData(searchTerm, callback) {
	console.log("getFlickrApiData called ");
	console.log("searchterm: "+ searchTerm);
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&jsoncallback=?";
	var query = {
		api_key: "25bce55818bb223cdc4599373b455323",
		tags: searchTerm,
		format: "json",
	}; 

	//console.log(flickrURL + query.api_key + query.tags + query.format);
	$.getJSON(flickrURL, query, callback);
	console.log("after .getJSON request");

};

function gotFlickrData(data) {
	console.log(data);
};

// format for displaying an image: 
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg


$('h1').css("background-color", "darkgreen");

$('#submit').on("click", function() {
	console.log("submit button working");

	var searchTerm = $('#input_area').val();

	getFlickrApiData(searchTerm, gotFlickrData);
});
