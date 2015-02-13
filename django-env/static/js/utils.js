function getStaticURL() {
	// set for local development
	// return '/static/';
	// set for production
	return 'https://picknese-s3.s3.amazonaws.com/';
}

function isInt(n) {
	if((parseFloat(n) == parseInt(n)) && !isNaN(n)){
		return true;
	} else { 
		return false;
	}
}

function parseLastNumberInURLPath() {
	var path = window.location.pathname;
	var res = path.split("/");
	for (var i = res.length - 1; i >= 0; i--) {
		if (isInt(res[i])) {
			return res[i];
		}
	}
	return null;
}