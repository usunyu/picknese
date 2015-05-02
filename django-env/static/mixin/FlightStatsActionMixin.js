
var FlightStatsActionMixin = {
	loadFlightStatusScheduledFlight: function() {
		var flight = this.refs.flight1.getDOMNode().value.trim().toUpperCase();
		var date = this.refs.datetime1.getDOMNode().value.trim();
		var momentdate = moment(date, 'MM/DD/YYYY');

        $.ajax({
            url: getFlightStatusScheduledFlightAPI(flight, momentdate.year(), momentdate.month() + 1, momentdate.date()),
            dataType: 'jsonp',
            type: 'GET',
            success: function(data) {
                if (data.scheduledFlights.length) {
                    console.log('has flight');
                } else {
                    $('#flight1-post-error-modal').modal('show');
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(
                    getFlightStatusScheduledFlightAPI(flight, momentdate.year(), momentdate.month() + 1, momentdate.date()),
                    status,
                    err.toString()
                );
            }.bind(this)
        });
    },
	getInitialState: function() {
        return {
            scheduledFlights: [],
        };
    },
}