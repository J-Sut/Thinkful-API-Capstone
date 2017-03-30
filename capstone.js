// example of flickr API call that returns data: 


//parts of the api request
function getFlickrApiData(callback) {
	console.log("getFlickrApiData called")
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
	var query = {
		api_key: "25bce55818bb223cdc4599373b455323",
		tags: "nature",
		format: "rest"
	};
	//console.log(flickrURL + query.api_key + query.tags + query.format);
	$.getJSON(flickrURL, query, callback);
	console.log("after .getJSON request")

};

function gotFlickrData(data) {
	console.log("data");
};

// format for displaying an image: 
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg


$('h1').css("background-color", "red");

$('#submit').on("click", function() {
	console.log("submit button working");
	getFlickrApiData(gotFlickrData);
});


//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=25bce55818bb223cdc4599373b455323&tags=Beth%27s+cafe&format=rest
//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=%…3cdc4599373b455323&tag=%26tags%3DBeth%2527s%2Bcafe&format=%26format%3Drest. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.