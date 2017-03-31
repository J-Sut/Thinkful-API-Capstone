// 1) State 



// example of flickr API call that returns data: 

// 2) f(modify-State)

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
//*** Can enter into the object like this
	
	displayFlickrResults(data);
};

// format for displaying an image: 
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

// 3) f(render-State)

function displayFlickrResults(data) {
//*** Can enter into the object like this
	console.log("from callback: " + data);
	
	let path = data.photos.photo;
	console.log(path);


	for (var i = 0; i <path.length; i++) {
		let farmId = data.photos.photo[i].farm;
		let serverId = data.photos.photo[i].server;
		let imageId = data.photos.photo[i].id;
		let secretId = data.photos.photo[i].secret;


		$('#display-results').append( "<li>" + data.photos.photo[i].owner + "</li>");
	}



	
	//console.log("inside displayFlickrResults");

};



// 4) Event Listeners

$('#submit').on("click", function() {
	console.log("submit button working");

	var searchTerm = $('#input_area').val();

	getFlickrApiData(searchTerm, gotFlickrData);
});
