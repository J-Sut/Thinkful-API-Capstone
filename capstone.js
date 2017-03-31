// 1) State 



// example of flickr API call that returns data: 

// 2) f(modify-State)

//parts of the api request
function getFlickrApiData(searchTerm, callback) {
	console.log("getFlickrApiData called ");
	console.log("searchterm: "+ searchTerm);
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&jsoncallback=?";
	var query = {
		api_key: "9f66f0eb170df4e593eccf8510114a2e",
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
// https://farm3.staticflickr.com/2844/33709591326_08e51b4564.jpg

// 3) f(render-State)

function loadHappening(visible) {
	if (visible) {
		$('#loading-screen').removeClass('hide');
	} else {
		$('#loading-screen').addClass('hide');	
	}
};

function clearPastResults() {
	$('#display-results').empty();
};

function displayFlickrResults(data) {
//*** Can enter into the object like this
	console.log("from callback: " + data);
	console.log(data);
	
	let path = data.photos.photo;
	//console.log(path);


	for (var i = 0; i <path.length; i++) {
		let farmId = path[i].farm;
		let serverId = path[i].server;
		let imageId = path[i].id;
		let secretId = path[i].secret;
		let imageURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + imageId + "_" + secretId + ".jpg";
		let imgElement = $('<img>', {src: imageURL, class: "thumbnails"});


		//console.log("imgElement: " + imgElement);


		$('#display-results').append(imgElement);

		//$('#display-results').append("<li>" + "https://farm" + farmId + ".staticflickr.com/" serverId + "/" + imageId + "_" + secretId + ".jpg" + "</li>");
	}

	loadHappening(false);	
	//console.log("inside displayFlickrResults");

};



// 4) Event Listeners

$('#submit').on("click", function() {
	console.log("submit button working");

	var searchTerm = $('#input_area').val();

	clearPastResults();
	loadHappening(true);
	getFlickrApiData(searchTerm, gotFlickrData);

});
