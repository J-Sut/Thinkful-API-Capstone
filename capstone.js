// ************************ 1) State ************************


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
		max: 5
	}

	$.getJSON(datamuseURL, query, function(data){
		callback(data, searchTerm);
	});
};

function gotRelatedWords(data, searchTerm) {
	for (var i = 0; i < data.length; i++) {
		let relatedTerm = data[i].word;
		getFlickrApiData(relatedTerm, displayFlickrResults);
	}
};


function getFlickrApiData(term, callback) {
//	console.log("getFlickrApiData called ");
//console.log("searchterm: "+ searchTerm);
	var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&jsoncallback=?";
	var query = {
		api_key: "9f66f0eb170df4e593eccf8510114a2e",
		tags: term,
		safe_search: 1,
		format: "json", 
		per_page: 3
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
		$('#loadingScreen').removeClass('hide');
	} else {
		$('#loadingScreen').addClass('hide');	
	}
};

function clearPastResults() {
	$('.display-results').empty();
	$('#panelDisplay').empty();

};

function displayFlickrResults(data, term) {
	//console.log("searchTerm3: " + term);
	makeCtrPanel(term);

	let termClass = term.replace(" ", "-");

	var results = $('<div>',{class: 'display-results '+ termClass + " col3"});

	results.append($("<h2>",{text: term, class: 'picsLabel'}));

	let path = data.photos.photo;

	for (var i = 0; i <path.length; i++) {
		let farmId = path[i].farm;
		let serverId = path[i].server;
		let imageId = path[i].id;
		let secretId = path[i].secret;
		let imageURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + imageId + "_" + secretId + ".jpg";
		let imgElement = $('<div>', {style: 'background-image: url("' + imageURL + '")', class: "thumbnails"});

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

	let termClass = term.replace(" ", "-");
	let ctrlPanelList = $('<li>', {class: 'imgDisplay'});
	let sectionLabel = $('<label>', {text: term});
	let button = $('<input>', {type: "checkbox", value: termClass, checked: true, class: "panelChecks"});

	ctrlPanelList.append(sectionLabel);
	sectionLabel.append(button);
	$('#panelDisplay').append(ctrlPanelList);
};

function toggleImgDisplay(){
	var term = $(this).val();
	$('div.'+term).toggleClass("hide");
};


// ************************ 4) Event Listeners ************************

$('form').on("submit", function(e) {
	e.preventDefault();

	var searchTerm = $('#input_area').val();

	getFlickrApiData(searchTerm, displayFlickrResults);
	getRelatedWords(searchTerm, gotRelatedWords);
	clearPastResults();
	loadHappening(true);
	//analyzeImage();
});

$("#ctrPanel").on("change", "input[type=checkbox]", toggleImgDisplay);





