// ************************ 1) State ************************

var searchTerm = "placeHolder";
var relatedTerm = [ "pH1", "pH2", "pH3"]; 

// ************************ 2) f(modify-State) ************************



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
		max: 2
	}

	$.getJSON(datamuseURL, query, function(data){
		callback(data, searchTerm);
	});
};

function gotRelatedWords(data, searchTerm) {
	for (var i = 0; i < data.length; i++) {
		let relatedTerm = data[i].word;
		console.log(relatedTerm);
		getFlickrApiData(relatedTerm, displayFlickrResults);
	}
	
	console.log("data from gotRW: " + data);
};


function getFlickrApiData(term, callback) {
//	console.log("getFlickrApiData called ");
//console.log("searchterm: "+ searchTerm);
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&jsoncallback=?";
	var query = {
		api_key: "9f66f0eb170df4e593eccf8510114a2e",
		tags: term,
		format: "json", 
		per_page: 2
	}; 

	//console.log(flickrURL + query.api_key + query.tags + query.format);
	$.getJSON(flickrURL, query, function(data){
		callback(data, term);
	});

};

// format for displaying an image: 
// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// https://farm3.staticflickr.com/2844/33709591326_08e51b4564.jpg

// ************************ 3) f(render-State) ************************


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

function displayFlickrResults(data, term) {
//	console.log("from callback: " + data);
//	console.log(data);
	console.log("searchTerm3: " + term);
	makeCtrPanel(term);
	// <div class="display-results">
	// 	<h2>Term
	// 	<img>...
	// </div>
	var results = $('<div>',{class: 'display-results '+ term});

	results.append($("<h2>",{text: term}));

	//******************************************************
	// Make a new div
	// Add a header element that displays the searchterm
	// run the below loop appending items to "this" element
	//******************************************************


	let path = data.photos.photo;

	for (var i = 0; i <path.length; i++) {
		let farmId = path[i].farm;
		let serverId = path[i].server;
		let imageId = path[i].id;
		let secretId = path[i].secret;
		let imageURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + imageId + "_" + secretId + ".jpg";
		let imgElement = $('<img>', {src: imageURL, class: "thumbnails"});

		//console.log("imgElement: " + imgElement);

		results.append(imgElement);

		//$('#display-results').append("<li>" + "https://farm" + farmId + ".staticflickr.com/" serverId + "/" + imageId + "_" + secretId + ".jpg" + "</li>");
	}

	$('#resultsArea').append(results);
	loadHappening(false);	
	//console.log("inside displayFlickrResults");

};

$('#instructions').accordion({
	collapsible: true,
	event: "click",
	active: 2
});


function makeCtrPanel(term) {

	let sectionLabel = $('<label>', {text: term});
	let button = $('<input>', {type: "checkbox", value: term, checked: true});
	//$('checkbox').val();

	sectionLabel.append(button);
	$('#ctrPanel').append(sectionLabel);

	// for each searchterm make button
	// make checkbox show/hide related images

};

function toggleImgDisplay(){
	var term = $(this).val();
	//'div.yay'
	$('div.'+term).toggleClass("hide");


	// go to section with class= term
	// toggle class hide
};


// ************************ 4) Event Listeners ************************

$("#ctrPanel").on("change", "input[type=checkbox]", toggleImgDisplay);

$('form').on("submit", function(e) {
	e.preventDefault();

	var searchTerm = $('#input_area').val();
	console.log("searchTerm2: " + searchTerm);
	console.log("relatedTerm2: " + relatedTerm);


	getFlickrApiData(searchTerm, displayFlickrResults);
	getRelatedWords(searchTerm, gotRelatedWords);
	clearPastResults();
	loadHappening(true);
	//analyzeImage();
});


//	console.log("searchTerm1: " + searchTerm);
//	console.log("relatedTerm1: " + relatedTerm);







