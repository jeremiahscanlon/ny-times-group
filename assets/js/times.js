// ==========================================================================
// page load function
// ==========================================================================

$(document).ready(function() {

	// ==========================================================================
	// Variables, Arrays, and Objects
	// ==========================================================================

	var searchText = 'trump';

	var fieldText = '';
	if (fieldText != '') {
		var field = '&fq=filter-field:('+fieldText+')';	
	} else {
		var field = '';
	}

	var beginText = '';
	if (beginText != '') {
		var begin = '&begin_date='+beginText;
	} else {
		var begin = '';
	}

	var endText = '';
	if (endText != '') {
		var end = '&end_date='+endText;
	} else {
		var end = '';
	}	

	var format = 'json';

	var key = '876979a9db203dc5eec31096c3b8678b:0:74628681';

	var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.'+format+'?[q='+searchText+field+begin+end+']&api-key='+key;

	// ==========================================================================
	// Functions
	// ==========================================================================

	$.ajax({url: url, method: 'GET'})
	.done(function(response) {

		console.log(url);
		console.log(response);
		var results = response.response.docs;

		for (var i = 0; i < results.length; i++) {
			var mainHeadline = results[i].headline.main;
			var mainHeadlineName = results[i].headline.name;
			var intro = results[i].lead_paragraph;
			var author = results[i].byline.original;
			var date = results[i].pub_date;
			var link = results[i].web_url;
			
			//console.log(mainHeadline +' - ' + mainHeadlineName);
			
			
			var articleDiv = $('<div>');
			
			if (mainHeadlineName) {
				var headline = mainHeadline +' - ' + mainHeadlineName;	
			} else {
				var headline = mainHeadline;
			}
			
			articleDiv.html('<h3>'+headline+'</h3>');
			if (author) {
				articleDiv.append('<p>'+author+'</p>');	
			}
			
			if (intro) {
				articleDiv.append('<p>'+intro+'</p>');	
			}
			
			
			

			

			


			$('.results').append(articleDiv);
		}



	});

	
 	
 	

	// ==========================================================================
	// BUTTONS AND ACTIONS
	// ==========================================================================



	
});






	

	


	

