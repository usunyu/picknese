/*
 * Flight Status API Helper
 * https://developer.flightstats.com/getting-started/
 * --------------------------------------------------
 */
function getFlightStatusAppID() {
    return '81774f6f';
}

function getFlightStatusAppKey() {
    return 'dc765dd9201598b2191f7faa0ad5ad73';
}

function isFlightStatusResultHasError(data) {
	if (data.hasOwnProperty("scheduledFlights")) {
		return data.scheduledFlights.length == 0;
	}
	return data.hasOwnProperty("error");
}

/*
 * https://developer.flightstats.com/api-docs/scheduledFlights/v1
 * --------------------------------------------------------------
 */
function getFlightStatusBaseAPI() {
    return 'https://api.flightstats.com/flex/';
}

function getFlightStatusSchedulesAPI() {
    return getFlightStatusBaseAPI() + 'schedules/rest/v1/jsonp/';
}

function getFlightStatusScheduledFlightAPI(flightnumber, year, month, day) {
    var flightnumbers = splitNumberCharInString(flightnumber);
    return getFlightStatusSchedulesAPI() + 'flight/' + flightnumbers[0] + '/' + flightnumbers[1] + '/arriving/'
        + year + '/' + month + '/' + day + '/?appId=' + getFlightStatusAppID() + '&appKey=' + getFlightStatusAppKey();
}

function getScheduledFlightFromResult(data) {
	// current we are mostly doing the international pick up,
	// asume always have return length as 1
	return data.scheduledFlights[0];
}

function getScheduledDepartureTimeFromResult(data) {
	var scheduledFlight = getScheduledFlightFromResult(data);
	return scheduledFlight.departureTime;
}

function getScheduledArrivalTimeFromResult(data) {
	var scheduledFlight = getScheduledFlightFromResult(data);
	return scheduledFlight.arrivalTime;
}

function getScheduledDepartureAirportFromResult(data) {
	var scheduledFlight = getScheduledFlightFromResult(data);
	var departureAirportFsCode = scheduledFlight.departureAirportFsCode;
	var airports = data.appendix.airports;
	for (var i = 0; i < airports.length; i++) {
		var airport = airports[i];
		if (airport.fs == departureAirportFsCode) {
			return airport;
		}
	}
	return null;
}

function getScheduledDepartureAirportNameFromResult(data) {
	var airport = getScheduledDepartureAirportFromResult(data);
	if (airport && airport.hasOwnProperty('name')) {
		return airport.name;
	}
	return null;
}

function getScheduledArrivalAirportFromResult(data) {
	var scheduledFlight = getScheduledFlightFromResult(data);
	var arrivalAirportFsCode = scheduledFlight.arrivalAirportFsCode;
	var airports = data.appendix.airports;
	for (var i = 0; i < airports.length; i++) {
		var airport = airports[i];
		if (airport.fs == arrivalAirportFsCode) {
			return airport;
		}
	}
	return null;
}

function getScheduledArrivalAirportNameFromResult(data) {
	var airport = getScheduledArrivalAirportFromResult(data);
	if (airport && airport.hasOwnProperty('name')) {
		return airport.name;
	}
	return null;
}

