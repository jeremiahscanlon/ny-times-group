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

	

	
 	
 	

	// ==========================================================================
	// BUTTONS AND ACTIONS
	// ==========================================================================



	
});






	

	


	

