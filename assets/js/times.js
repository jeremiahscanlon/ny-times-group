// ==========================================================================
// page load function
// ==========================================================================

$(document).ready(function() {

	// ==========================================================================
	// Variables, Arrays, and Objects
	// ==========================================================================

	//NOTE: we choose to put the variables within the click function so that 



	// ==========================================================================
	// BUTTONS AND ACTIONS
	// ==========================================================================

	// when clear is clicked run the empty function
	$('#clear').click(function(){
		empty();
	});

	// when search is clicked run the search function
	$('#search').click(function(){
		search();
	});


	// ==========================================================================
	// Functions
	// ==========================================================================
 	
 	// empty function
 	function empty() {

 		// empty the information out of the div
 		$('.well').empty();

 		// hide the empty div ... NOTE: must be done to hide empty well
 		$('.well').hide();

 	}

 	function search() {

 		// before doing anything else empty any previous results
 		empty();

 		// capture the search text ... NOTE: .trim() removes any leading or ending spaces
		var searchText = $( '#termSearch' ).val().trim();

		// this 
		var fieldText = '';
		if (fieldText) {
			var field = '&fq=filter-field:('+fieldText+')';	
		} else {
			var field = '';
		}

		var number = $( '#records' ).val();

		var yearStart = $( '#yearStart' ).val().trim();
		var beginText = yearStart+'0101';
		if (yearStart) {
			var begin = '&begin_date='+beginText;
		} else {
			var begin = '';
		}

		var yearEnd = $( '#yearEnd' ).val().trim();
		var endText = yearEnd+'1231';
		if (yearEnd) {
			var end = '&end_date='+endText;
		} else {
			var end = '';
		}	

		var format = 'json';

		var key = '876979a9db203dc5eec31096c3b8678b:0:74628681';

		var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.'+format+'?q='+searchText+field+begin+end+'&api-key='+key;

		console.log(url);

		$.ajax({url: url, method: 'GET'})
		.done(function(response) {

			console.log(url);
			console.log(response);
			var results = response.response.docs;

			for (var i = 0; i < number; i++) {

				var mainHeadline = results[i].headline.main;
				var mainHeadlineName = results[i].headline.name;
				var intro = results[i].lead_paragraph;
				var authorByline = results[i].byline;
				if (authorByline) {
					var author = authorByline.original;	
				}
				var pub_date = results[i].pub_date;
				var date = pub_date.substring(0, pub_date.lastIndexOf('T'));
				var link = results[i].web_url;
				
				//console.log(mainHeadline +' - ' + mainHeadlineName);
				
				
				var articleDiv = $('<div>');
				
				if (mainHeadlineName) {
					var headline = mainHeadline +' - ' + mainHeadlineName;	
				} else {
					var headline = mainHeadline;
				}
				
				j=i+1;

				articleDiv.html('<h3>'+j+' - '+headline+'</h3>');
				if (author) {
					articleDiv.append('<p>'+author+'</p>');	
				}
				
				if (date) {
					articleDiv.append('<p>Published Date: '+date+'</p>');	
				}

				if (intro) {
					articleDiv.append('<p>'+intro+'</p>');	
				}

				if (link) {
					articleDiv.append('<p><a href="'+link+'" target="_blank">'+link+'</a></p>');	
				}
				
				
				$('#well'+j).append(articleDiv);
				$('#well'+j).show();
				//console.log('#well'+i);
			}
		});
 	}

});






	

	


	

