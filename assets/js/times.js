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

	// when clear is clicked run the two empty functions
	$('#clear').click(function(){
		emptyresults();
		emptyForm();
	});

	// when search is clicked run the search function
	$('#search').click(function(){
		search();
	});


	// ==========================================================================
	// Functions
	// ==========================================================================
 	
 	// empty form function
 	function emptyForm() {

 		// empty the text out of the search and year textboxes
 		$('#termSearch').val('');
 		$('#yearStart').val('');
 		$('#yearEnd').val('');

 	}

 	// empty results function
 	function emptyresults() {

 		// empty the information out of the div
 		$('.well').empty();

 		// hide the empty div ... NOTE: must be done to hide empty well
 		$('.well').hide();

 	}

 	// run the search function
 	function search() {

 		// before doing anything else empty any previous results
 		emptyresults();

 		// capture the search text ... NOTE: .trim() removes any leading or ending spaces
		var searchText = $( '#termSearch' ).val().trim();

		// NOTE: We are not using this variable. It was set-up if we ever needed it later
		// create the variable
		var fieldText = '';

		// make sure the field is not empty
		if (fieldText) {
			// if data exists in the field then create a new variable with the text to be entered into the URL 
			var field = '&fq=filter-field:('+fieldText+')';	
		} else {
			// if field is empty then the variable used in the URL should be empty
			var field = '';
		}

		// capture the value at the time of click for the number of records requested
		var number = $( '#records' ).val();

		// get current year to use later
		var today = new Date();
		var thisYear = today.getFullYear();

		// capture the starting year from the form
		var yearStart = $( '#yearStart' ).val().trim();
		
		// make sure the user entered a year into the form
		// if they entered a year ...
		if (yearStart) {

			// check to make sure it is a valid year 
			// if it's older than 1850 ...
			if (yearStart <= 1850) {
				
				// alert user to pick a newer year
				alert('Please choose a year greater than 1850.');
				// exit the function
				return;

			// if its newer than current year ...
			} else if (yearStart > thisYear){

				// alert user to pick a newer year
				alert('Please choose a year that is not in the future.');
				// exit the function
				return;

			// if both years are valid
			} else {
					
				// create a variable that puts the year into the format required by the api
				// NOTE: this is the begining, so we are doing january first
				var beginText = yearStart+'0101';
				// create a variable that has the string format required by the api
				var begin = '&begin_date='+beginText;
			}

		// if they did not enter a year ...
		} else {

			// make the variable to be entered into the URL an empty string
			var end = '';

		}

		// capture the ending year from the form
		var yearEnd = $( '#yearEnd' ).val().trim();

		// make sure the user entered a year into the firm
		// if they entered a year ...
		if (yearEnd) {

			// check to make sure it is a valid year 
			// if it's older than 1850 ...
			if (yearEnd <= 1850) {
				
				// alert user to pick a newer year
				alert('Please choose a year greater than 1850.');
				// exit the function
				return;

			// if its newer than current year ...
			} else if (yearEnd > thisYear){

				// alert user to pick a newer year
				alert('Please choose a year that is not in the future.');
				// exit the function
				return;

			// if both years are valid
			} else {
					
				// create a variable that puts the year into the format required by the api
				// NOTE: this is the begining, so we are doing january first
				var endText = yearEnd+'1231';
				// create a variable that has the string format required by the api
				var end = '&end_date='+endText;
			}

		// if they did not enter a year ...
		} else {

			// make the variable to be entered into the URL an empty string
			var begin = '';

		}

		// create a variable that holds the key
		// NOTE: this can be changed if someone has a different key
		var key = '876979a9db203dc5eec31096c3b8678b:0:74628681';

		// create a variable to hold the api request url
		var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+searchText+field+begin+end+'&api-key='+key;

		$.ajax({url: url, method: 'GET'})
		.done(function(response) {

			// console log the response for future troubleshooting
			console.log(response);

			// create a variable to easily reach the response data
			var results = response.response.docs;

			// create a loop
			// NOTE: the amount of times going through the loop is set to the value from the drop-down of number of responses reuqested
			for (var i = 0; i < number; i++) {

				// create variables for the data to be output
				var mainHeadline = results[i].headline.main;
				var mainHeadlineName = results[i].headline.name;
				var intro = results[i].lead_paragraph;
				var pub_date = results[i].pub_date;
				var link = results[i].web_url;
				var date = pub_date;

				// NOTE: after some troubleshooting we had errors with this variable, so before we set the variable we need to make sure that the path exists...
				var authorByline = results[i].byline;
				if (authorByline) {
					var author = authorByline.original;	
				}
				
				// create a div to hold the data
				var articleDiv = $('<div>');
				
				// some headlines have a sub-headline
				// if the sub-headline exists...
				if (mainHeadlineName) {
					
					// make a variable that has the headline then a dash and the sub-headline
					var headline = mainHeadline +' - ' + mainHeadlineName;	

				// if the sub-headline doesn't exist ...
				} else {

					// make a variable the just has the headline
					var headline = mainHeadline;
				}
				
				// create a variable to represent the actual number of the entry not it's place in the array
				j=i+1
				// add the headline to the div
				articleDiv.html('<h3>'+j+' - '+headline+'</h3>');

				// if the author exists add it to the div
				if (author) {
					articleDiv.append('<p>'+author+'</p>');	
				}
				
				// if the date exists add it to the div
				if (date) {
					articleDiv.append('<p>Published Date: '+date+'</p>');	
				}

				// if the intro exists add it to the div
				if (intro) {
					articleDiv.append('<p>'+intro+'</p>');	
				}

				// if the link exists add it to the div, make it linkable, and make it open in a new tab
				if (link) {
					articleDiv.append('<p><a href="'+link+'" target="_blank">'+link+'</a></p>');	
				}
				
				// add the created div to the respective well
				$('#well'+i).append(articleDiv);

				// show the well 
				$('#well'+i).show();
			}
		});
 	}
});






	

	


	

