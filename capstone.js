// ************************ 1) State ************************

// ************************ 2) f(modify-State) ************************

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

// format for displaying a Flickr image by URL: 
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
	$('#resultsArea').empty();
};

function displayFlickrResults(data, term) {
	makeCtrPanel(term);

	let termClass = term.replace(" ", "-");

	var results = $('<div>',{class: 'display-results '+ termClass + " col3 col6"});

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

// $('#instructions').accordion({
// 	collapsible: true,
// 	event: "click",
// 	active: 2
// });

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

/*
function switchLight(color) {
	$('#clock').css("background-color", color)
};
*/

function turnBlue() {
	$('#clock').css("background-color", "rgba(1, 62, 95, 1)")
};

function turnGreen() {
	$('#clock').css("background-color", "green")
};

function turnYellow() {
	$('#clock').css("background-color", "yellow")
};

function turnRed() {
	$('#clock').css("background-color", "red")
};

function turnBlack() {
	$('#clock').css("background-color", "black")
};

$('instructionsTitle').hover('cursor: pointer', 'cursor: hand');

// ************************ 4) Event Listeners ************************

$('form').on("submit", function(e) {
	e.preventDefault();

	var searchTerm = $('#input_area').val();

	getFlickrApiData(searchTerm, displayFlickrResults);
	getRelatedWords(searchTerm, gotRelatedWords);
	clearPastResults();
	loadHappening(true);
});

$('#ctrPanel').on("change", "input[type=checkbox]", toggleImgDisplay);

$('#clock').on("click", function(){
	turnBlue();
	setTimeout(turnGreen, 10000);
	setTimeout(turnYellow, 20000);
	setTimeout(turnRed, 30000);
	setTimeout(turnBlack, 35000);
});

$('#instructionsPopUp').on('click', function(e){
  e.preventDefault();
  $('#instructionsPopUp').fadeOut('slow');
})
$('#showInstructions').on('click', function(e){
  e.preventDefault();
  $('#instructionsPopUp').fadeIn('slow');
})

/*
$('#clock').on("click", function(){
	switchLight("blue");
	setTimeout(switchLight("green"), 1000);
	setTimeout(switchLight("yellow"), 2000);
	setTimeout(switchLight("red"), 3000);
	setTimeout(switchLight("black"), 3500);
});
*/




