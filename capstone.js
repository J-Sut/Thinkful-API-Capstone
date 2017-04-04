// 1) State 



// example of flickr API call that returns data: 

// 2) f(modify-State)



/*

function analyzeImage() {  
    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=tags&details=&language=en",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","7dd9774ea69f483c82f3dd8a8bf90582");
        },

        type: "POST",
        // Request body
        data: "https://media.freepik.com/accounts/img/badges/you_are_on_top.svg",
    })
    .done(function(data) {
        alert("success");
        console.log(data)
    })

    .fail(function() {
        console.log("error");
    });
};

*/

function getRelatedWords(searchTerm, callback) {
	let datamuseURL = "https://api.datamuse.com/words?";
	let query = {
		ml: searchTerm, 
		max: 10
	}

	$.getJSON(datamuseURL, query, callback)
};

function gotRelatedWords(data) {
	for (var i = 0; i < data.length; i++) {
		let searchTerm = data[i].word
		console.log(searchTerm);
		getFlickrApiData(searchTerm, displayFlickrResults);

	}
};


function getFlickrApiData(searchTerm, callback) {
//	console.log("getFlickrApiData called ");
//	console.log("searchterm: "+ searchTerm);
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&jsoncallback=?";
	var query = {
		api_key: "9f66f0eb170df4e593eccf8510114a2e",
		tags: searchTerm,
		format: "json", 
		per_page: 5
	}; 

	//console.log(flickrURL + query.api_key + query.tags + query.format);
	$.getJSON(flickrURL, query, callback);

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
//	console.log("from callback: " + data);
//	console.log(data);
	
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

$('#instructions').accordion({
	collapsible: true,
	event: "click",
	active: 2
});

// 4) Event Listeners

$('form').on("submit", function(e) {
	e.preventDefault();
//	console.log("submit button working");

	let searchTerm = $('#input_area').val();

	getRelatedWords(searchTerm, gotRelatedWords);
	clearPastResults();
	loadHappening(true);
	//getFlickrApiData(searchTerm, displayFlickrResults);
	//analyzeImage();
});









