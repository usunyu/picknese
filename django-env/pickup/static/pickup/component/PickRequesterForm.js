var PickRequesterFormCollapseButton = React.createClass({displayName: "PickRequesterFormCollapseButton",
    render: function() {
        return (
            React.createElement("button", {className: "btn btn-success", type: "button", "data-toggle": "collapse", 
                "data-target": "#pick-request-post", "aria-expanded": "false", "aria-controls": "pick-request-post", 
                style: {marginBottom: "10px"}}, 
                "Post Your Request ", React.createElement("i", {className: "glyphicon glyphicon-plus"})
            )
        );
    }
});

var PickRequesterForm = React.createClass({displayName: "PickRequesterForm",
    handleFlightButtonLoading: function(e) {
        var destination = this.refs.destination1.getDOMNode().value.trim();
        var flight = this.refs.flight1.getDOMNode().value.trim().toUpperCase();
        var date = this.refs.datetime1.getDOMNode().value.trim();
        var baggage = this.refs.baggage.getDOMNode().value.trim();
        var momentdate = moment(date, 'MM/DD/YYYY');

        if (destination && flight && momentdate.isValid() && baggage) {
            $('#flight1-post-button').button('loading');
        }
    },
    handleFlightPreSubmit: function(e) {
        e.preventDefault();
        // check if the input is correct
        var destination = this.refs.destination1.getDOMNode().value.trim();
        var flight = this.refs.flight1.getDOMNode().value.trim().toUpperCase();
        var date = this.refs.datetime1.getDOMNode().value.trim();
        var baggage = this.refs.baggage.getDOMNode().value.trim();
        // month is 0 based, http://momentjs.com/docs/#/get-set/month/
        var momentdate = moment(date, 'MM/DD/YYYY');

        if (!destination || !flight || !momentdate.isValid() || !baggage) {
            $( "#pick-request-post" ).effect("shake", {distance: 10, times: 2});
            return;
        }

        // load scheduled flight
        $.ajax({
            url: getFlightStatusScheduledFlightAPI(flight, momentdate.year(), momentdate.month() + 1, momentdate.date()),
            dataType: 'jsonp',
            type: 'GET',
            success: function(data) {
                if (!isResultHasError(data)) {
                    this.setState({flightSchedulesData: data});
                    $('#flight1-post-modal-body').html(
                        '<div class="row">' + 
                        '<p class="col-sm-6"><b>Flight Number: </b>' + flight + '</p>' +
                        '<p class="col-sm-6"><b>Baggage Number: </b>' + baggage + '</p>' +
                        '<p class="col-sm-6"><b>Departure Time: </b>' + getScheduledDepartureTimeFromResult(data) + '</p>' +
                        '<p class="col-sm-6"><b>Arrival Time: </b>' + getScheduledArrivalTimeFromResult(data) + '</p>' +
                        '<p class="col-sm-6"><b>From: </b>' + getScheduledDepartureAirportNameFromResult(data) + '</p>' +
                        '<p class="col-sm-6"><b>To: </b>' + getScheduledArrivalAirportNameFromResult(data) + '</p>' + 
                        '</div>'
                    );
                    $('#flight1-post-modal').modal('show');

                    dismissFlightRequestLoadingEffect();
                } else {
                    $('#flight1-post-error-modal-title').text("Cannot find schedule for " + flight);
                    $('#flight1-post-error-modal').modal('show');

                    dismissFlightRequestLoadingEffect();
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
    handleFlightSubmit: function(e) {
        e.preventDefault();

        var requester = this.props.currentUser;
        var university = this.props.university;
        // TODO: auto set price according distance
        this.props.onPickRequesterSubmit({
            pick_type : 1,
            price : 20,
            start : this.refs.flight1.getDOMNode().value.trim().toUpperCase(),
            date_time: getScheduledArrivalTimeFromResult(this.state.flightSchedulesData),
            bags: this.refs.baggage.getDOMNode().value.trim(),
            destination : this.refs.destination1.getDOMNode().value.trim(),
            description : this.refs.description1.getDOMNode().value.trim(),
        }, requester, university, 'flight1-post-modal');
        this.refs.flight1.getDOMNode().value = '';
        this.refs.datetime1.getDOMNode().value = '';
        this.refs.baggage.getDOMNode().value = '';
        this.refs.destination1.getDOMNode().value = '';
        this.refs.description1.getDOMNode().value = '';
    },
    handleGeneralPreSubmit: function(e) {
        e.preventDefault();

        var start = this.refs.start2.getDOMNode().value.trim();
        var destination = this.refs.destination2.getDOMNode().value.trim();
        var date_time = this.refs.datetime2.getDOMNode().value.trim();
        var round_trip = this.refs.round_trip.getDOMNode().checked;
        var time_flexible = this.refs.time_flexible.getDOMNode().checked;
        // month is 0 based, http://momentjs.com/docs/#/get-set/month/
        var moment_time = moment(date_time, 'MM/DD/YYYY HH:mm');

        if (!start || !destination || !moment_time.isValid()) {
            $( "#pick-request-post" ).effect("shake", {distance: 10, times: 2});
            return;
        }

        round_trip = round_trip ? "YES" : "NO";
        time_flexible = time_flexible ? "YES" : "NO";
        $('#general2-post-modal-body').html(
            '<div class="row">' + 
            '<p class="col-sm-6"><b>From: </b>' + start + '</p>' +
            '<p class="col-sm-6"><b>To: </b>' + destination + '</p>' +
            '<div class="clearfix" />' +
            '<p class="col-sm-12"><b>Pick Up Time: </b>' + date_time + '</p>' +
            '<p class="col-sm-6"><b>Round Trip: </b>' + round_trip + '</p>' +
            '<p class="col-sm-6"><b>Time Flexible: </b>' + time_flexible + '</p>' +
            '</div>'
        );
        $('#general2-post-modal').modal('show');
    },
    handleGeneralSubmit: function(e) {
        e.preventDefault();

        var requester = this.props.currentUser;
        var university = this.props.university;

        var date_time = this.refs.datetime2.getDOMNode().value.trim();
        var moment_time = moment(date_time, 'MM/DD/YYYY HH:mm');

        // TODO: auto set price according distance
        this.props.onPickRequesterSubmit({
            pick_type : 2,
            price : 20,
            start : this.refs.start2.getDOMNode().value.trim(),
            date_time: moment_time.format(),
            round_trip: this.refs.round_trip.getDOMNode().checked,
            time_flexible: this.refs.time_flexible.getDOMNode().checked,
            destination : this.refs.destination2.getDOMNode().value.trim(),
            description : this.refs.description2.getDOMNode().value.trim(),
        }, requester, university, 'general2-post-modal');
        this.refs.start2.getDOMNode().value = '';
        this.refs.datetime2.getDOMNode().value = '';
        this.refs.destination2.getDOMNode().value = '';
        this.refs.description2.getDOMNode().value = '';
        this.refs.round_trip.getDOMNode().checked = false;
        this.refs.time_flexible.getDOMNode().checked = false;
    },
    componentDidUpdate: function() {
        // Prepare google map api
        var input1 = document.getElementById('google-map-place1');
        var input2 = document.getElementById('google-map-place2');
        var input3 = document.getElementById('google-map-place3');
        if (!input1 || !input2 || !input3) {
            return;
        }
        var options = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(input1, options);
        new google.maps.places.Autocomplete(input2, options);
        new google.maps.places.Autocomplete(input3, options);

        // Prepare date selector
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $('#datetimepicker1').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: today,
        });
        $('#datetimepicker2').datetimepicker({
            minDate: today,
        });
    },
    getInitialState: function() {
        return {
            flightSchedulesData: null,
        };
    },
    render: function() {
        var requester = this.props.currentUser;
        var university = this.props.university;
        if (!university) {
            return React.createElement("div", null);
        }
        return (
            React.createElement("div", {id: "pick-request-post", className: "panel panel-primary collapse"}, 
                /* Pick Up Tab Select */
                React.createElement("div", {className: "panel-heading clearfix"}, 
                    React.createElement("ul", {className: "inline-list col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center", style: {marginBottom: "0px"}}, 
                        React.createElement("li", {className: "active col-xs-6 col-sm-6 col-md-6 col-lg-6"}, 
                            React.createElement("i", {className: "glyphicon glyphicon-plane"}), " ", 
                            React.createElement("a", {href: "#tab_flight", "data-toggle": "tab"}, "Flight")
                        ), 
                        React.createElement("li", {className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"}, 
                            React.createElement("i", {className: "glyphicon glyphicon-globe"}), " ", 
                            React.createElement("a", {href: "#tab_general", "data-toggle": "tab"}, "General")
                        )
                    )
                ), 
                React.createElement("div", {className: "tab-content"}, 
                    /* Flight Pick Up Tab */
                    React.createElement("div", {className: "tab-pane active", id: "tab_flight"}, 
                        React.createElement("form", {className: "form-horizontal", onSubmit: this.handleFlightPreSubmit}, 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement("div", {className: "col-sm-6", id: "flight1-input"}, 
                                        React.createElement("input", {type: "text", 
                                               className: "form-control", 
                                               placeholder: "Your flight number?", 
                                               required: true, 
                                               ref: "flight1"})
                                    ), 
                                    React.createElement("div", {className: "col-sm-6", id: "destination1-input"}, 
                                        React.createElement("input", {type: "text", 
                                               id: "google-map-place1", 
                                               className: "form-control", 
                                               placeholder: "Where you want to go?", 
                                               required: true, 
                                               ref: "destination1"})
                                    ), 
                                    React.createElement("div", {className: "col-sm-6"}, 
                                        React.createElement("div", {className: "input-group date", id: "datetimepicker1"}, 
                                            React.createElement("input", {type: "text", className: "form-control", 
                                                   placeholder: "Your arrival date?", 
                                                   style: {marginTop: '12px'}, 
                                                   required: true, 
                                                   ref: "datetime1"}), 
                                            React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                                        )
                                    ), 
                                    React.createElement("div", {className: "col-sm-6", id: "baggage-input"}, 
                                        React.createElement("input", {type: "number", className: "form-control", 
                                               placeholder: "Your number of baggage?", 
                                               style: {marginTop: '12px'}, 
                                               min: "1", 
                                               max: "6", 
                                               required: true, 
                                               ref: "baggage"})
                                    ), 
                                    React.createElement("div", {className: "col-sm-12"}, 
                                        React.createElement("textarea", {
                                            className: "form-control pick-requester-note", 
                                            rows: "1", 
                                            placeholder: "Anything you want to mention?", 
                                            ref: "description1"}
                                        )
                                    )
                                )
                            ), 
                            React.createElement("div", {className: "panel-footer clearfix"}, 
                                /* Flight Pick Up Request Button */
                                React.createElement("button", {
                                    id: "flight1-post-button", 
                                    type: "submit", 
                                    style: {float: 'right'}, 
                                    className: "btn btn-primary", 
                                    "data-loading-text": "Processing...", 
                                    "data-role": "button", 
                                    onClick: this.handleFlightButtonLoading}, 
                                    "Post Your Request"
                                ), 
                                /* Flight Pick Up Request Success Modal */
                                React.createElement("div", {className: "modal fade", id: "flight1-post-modal", tabIndex: "-1", role: "dialog", "aria-hidden": "true"}, 
                                    React.createElement("div", {className: "modal-dialog"}, 
                                        React.createElement("div", {className: "modal-content"}, 
                                            React.createElement("div", {className: "modal-header"}, 
                                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                                                React.createElement("h4", {className: "modal-title"}, "Confirm your request")
                                            ), 
                                            React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                            React.createElement("div", {className: "modal-body", id: "flight1-post-modal-body"}
                                            ), 
                                            React.createElement("div", {className: "modal-footer"}, 
                                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                                React.createElement("button", {type: "button", className: "btn btn-primary", 
                                                        onClick: this.handleFlightSubmit}, "Confirm")
                                            )
                                        )
                                    )
                                ), 
                                /* Flight Pick Up Request Error Modal */
                                React.createElement("div", {className: "modal fade", id: "flight1-post-error-modal", tabIndex: "-1", role: "dialog", "aria-hidden": "true"}, 
                                    React.createElement("div", {className: "modal-dialog"}, 
                                        React.createElement("div", {className: "modal-content"}, 
                                            React.createElement("div", {className: "modal-header"}, 
                                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                                                React.createElement("h4", {className: "modal-title", id: "flight1-post-error-modal-title"}, "Cannot find flight schedule")
                                            ), 
                                            React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                            React.createElement("div", {className: "modal-body"}, 
                                                React.createElement("p", null, "Sorry, we cannot find any flight schedule based on your input, please input the correct date and flight number."), 
                                                React.createElement("p", null, "For the date, please input the arrival date as format MM/DD/YYYY."), 
                                                React.createElement("p", null, "For the flight number, please input as format CSN327, for the" + ' ' + 
                                                    " ", React.createElement("a", {href: "http://en.wikipedia.org/wiki/List_of_airline_codes", target: "_blank"}, "airline code reference"), "."
                                                )
                                            ), 
                                            React.createElement("div", {className: "modal-footer"}, 
                                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close")
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ), 
                    /* General Pick Up Tab */
                    React.createElement("div", {className: "tab-pane", id: "tab_general"}, 
                        React.createElement("form", {className: "form-horizontal", onSubmit: this.handleGeneralPreSubmit}, 
                            React.createElement("div", {className: "panel-body"}, 
                                React.createElement("div", {className: "form-group"}, 
                                    React.createElement("div", {className: "col-sm-6"}, 
                                        React.createElement("input", {type: "text", 
                                               id: "google-map-place2", 
                                               className: "form-control", 
                                               placeholder: "Where to pick up you?", 
                                               required: true, 
                                               ref: "start2"})
                                    ), 
                                    React.createElement("div", {className: "col-sm-6"}, 
                                        React.createElement("input", {type: "text", 
                                               id: "google-map-place3", 
                                               className: "form-control", 
                                               placeholder: "Where you want to go?", 
                                               required: true, 
                                               ref: "destination2"})
                                    ), 
                                    React.createElement("div", {className: "col-sm-6"}, 
                                        React.createElement("div", {className: "input-group date", id: "datetimepicker2"}, 
                                            React.createElement("input", {type: "text", className: "form-control", 
                                                   placeholder: "Your pick up time?", 
                                                   required: true, 
                                                   style: {marginTop: '12px'}, 
                                                   ref: "datetime2"}), 
                                            React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                                        )
                                    ), 

                                    React.createElement("div", {className: "checkbox col-sm-3"}, 
                                        React.createElement("label", {style: {marginTop: '15px'}}, 
                                            React.createElement("input", {type: "checkbox", ref: "round_trip"}, " Round Trip ")
                                        )
                                    ), 
                                    React.createElement("div", {className: "checkbox col-sm-3"}, 
                                        React.createElement("label", {style: {marginTop: '15px'}}, 
                                            React.createElement("input", {type: "checkbox", ref: "time_flexible"}, " Time Flexible ")
                                        )
                                    ), 

                                    React.createElement("div", {className: "col-sm-12"}, 
                                        React.createElement("textarea", {
                                            className: "form-control pick-requester-note", 
                                            rows: "1", 
                                            placeholder: "Any thing you want to mention?", 
                                            ref: "description2"}
                                        )
                                    )
                                )
                            ), 
                            React.createElement("div", {className: "panel-footer clearfix"}, 
                                /* General Pick Up Request Button */
                                React.createElement("button", {
                                    id: "general2-post-button", 
                                    type: "submit", 
                                    style: {float: 'right'}, 
                                    className: "btn btn-primary"}, 
                                    "Post Your Request"
                                ), 
                                /* General Pick Up Request Confirm Modal */
                                React.createElement("div", {className: "modal fade", id: "general2-post-modal", tabIndex: "-1", role: "dialog", "aria-hidden": "true"}, 
                                    React.createElement("div", {className: "modal-dialog"}, 
                                        React.createElement("div", {className: "modal-content"}, 
                                            React.createElement("div", {className: "modal-header"}, 
                                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
                                                React.createElement("h4", {className: "modal-title"}, "Confirm Your Request")
                                            ), 
                                            React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                            React.createElement("div", {className: "modal-body", id: "general2-post-modal-body"}
                                            ), 
                                            React.createElement("div", {className: "modal-footer"}, 
                                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                                React.createElement("button", {type: "button", className: "btn btn-primary", 
                                                        onClick: this.handleGeneralSubmit}, "Confirm")
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});