var PickRequesterFormCollapseButton = React.createClass({
    render: function() {
        return (
            <button className="btn btn-success" type="button" data-toggle="collapse" 
                data-target="#pick-request-post" aria-expanded="false" aria-controls="pick-request-post"
                style={{marginBottom: "10px"}}>
                Post Your Request <i className="glyphicon glyphicon-plus"></i>
            </button>
        );
    }
});

var PickRequesterForm = React.createClass({
    handleFlightPreSubmit: function(e) {
        e.preventDefault();
        // clear input error hint
        // $( "#destination1-input" ).removeClass("has-error");
        // $( "#flight1-input" ).removeClass("has-error");
        // $( "#datetimepicker1" ).removeClass("has-error");
        // check if the input is correct
        var destination = this.refs.destination1.getDOMNode().value.trim();
        var flight = this.refs.flight1.getDOMNode().value.trim().toUpperCase();
        var date = this.refs.datetime1.getDOMNode().value.trim();
        var baggage = this.refs.baggage.getDOMNode().value.trim();
        // month is 0 based, http://momentjs.com/docs/#/get-set/month/
        var momentdate = moment(date, 'MM/DD/YYYY');

        if (!destination || !flight || !momentdate.isValid()) {
            // if (!destination) {
            //     $( "#destination1-input" ).addClass("has-error");
            // }
            // if (!flight) {
            //     $( "#flight1-input" ).addClass("has-error");
            // }
            // if (!moment(date, 'MM/DD/YYYY').isValid()) {
            //     $( "#datetimepicker1" ).addClass("has-error");
            // }
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
                } else {
                    $('#flight1-post-error-modal-title').text("Cannot find schedule for " + flight);
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
        // month is 0 based, http://momentjs.com/docs/#/get-set/month/
        var moment_time = moment(date_time, 'MM/DD/YYYY HH:mm');

        if (!start || !destination || !moment_time.isValid()) {
            $( "#pick-request-post" ).effect("shake", {distance: 10, times: 2});
            return;
        }

        $('#general2-post-modal-body').html(
            '<div class="row">' + 
            '<p class="col-sm-6"><b>From: </b>' + start + '</p>' +
            '<p class="col-sm-6"><b>To: </b>' + destination + '</p>' +
            '<div class="clearfix" />' +
            '<p class="col-sm-6"><b>Pick Up Time: </b>' + date_time + '</p>' +
            '<p class="col-sm-6"><b>Round Trip: </b>' + 'Yes' + '</p>' +
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
            destination : this.refs.destination2.getDOMNode().value.trim(),
            description : this.refs.description2.getDOMNode().value.trim(),
        }, requester, university, 'general2-post-modal');
        this.refs.start2.getDOMNode().value = '';
        this.refs.datetime2.getDOMNode().value = '';
        this.refs.destination2.getDOMNode().value = '';
        this.refs.description2.getDOMNode().value = '';
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
            return <div></div>;
        }
        return (
            <div>
            <div id="pick-request-post" className="panel panel-primary collapse">
                {/* Pick Up Tab Select */}
                <div className="panel-heading clearfix">
                    <ul className="inline-list col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{marginBottom: "0px"}}>
                        <li className="active col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <i className="glyphicon glyphicon-plane"></i>&nbsp;
                            <a href="#tab_flight" data-toggle="tab">Flight</a>
                        </li>
                        <li className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <i className="glyphicon glyphicon-globe"></i>&nbsp;
                            <a href="#tab_general" data-toggle="tab">General</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    {/* Flight Pick Up Tab */}
                    <div className="tab-pane active" id="tab_flight">
                        <form className="form-horizontal" onSubmit={this.handleFlightPreSubmit}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="col-sm-6" id="flight1-input">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Your flight number?"
                                               required
                                               ref="flight1" />
                                    </div>
                                    <div className="col-sm-6" id="destination1-input">
                                        <input type="text"
                                               id="google-map-place1"
                                               className="form-control" 
                                               placeholder="Where you want to go?"
                                               required
                                               ref="destination1" />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className='input-group date' id='datetimepicker1'>
                                            <input type='text' className="form-control"
                                                   placeholder="Your arrival date?"
                                                   style={{marginTop: '12px'}}
                                                   required
                                                   ref="datetime1" />
                                            <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6" id="baggage-input">
                                        <input type='number' className="form-control"
                                               placeholder="Your number of baggage?"
                                               style={{marginTop: '12px'}}
                                               min="1"
                                               max="6"
                                               required
                                               ref="baggage" />
                                    </div>
                                    <div className="col-sm-12">
                                        <textarea
                                            className="form-control pick-requester-note"
                                            rows="1"
                                            placeholder="Anything you want to mention?"
                                            ref="description1">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                                {/* Flight Pick Up Request Button */}
                                <button
                                    id="flight1-post-button"
                                    type="submit"
                                    style={{float: 'right'}}
                                    className="btn btn-primary">
                                    Post Your Request
                                </button>
                                {/* Flight Pick Up Request Success Modal */}
                                <div className="modal fade" id="flight1-post-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Confirm your request</h4>
                                            </div>
                                            <hr style={{marginTop: "-10px"}}/>
                                            <div className="modal-body" id="flight1-post-modal-body">
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary"
                                                        onClick={this.handleFlightSubmit}>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Flight Pick Up Request Error Modal */}
                                <div className="modal fade" id="flight1-post-error-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title" id="flight1-post-error-modal-title">Cannot find flight schedule</h4>
                                            </div>
                                            <hr style={{marginTop: "-10px"}}/>
                                            <div className="modal-body">
                                                <p>Sorry, we cannot find any flight schedule based on your input, please input the correct date and flight number.</p>
                                                <p>For the date, please input the arrival date as format MM/DD/YYYY.</p>
                                                <p>For the flight number, please input as format CSN327, for the 
                                                    &nbsp;<a href="http://en.wikipedia.org/wiki/List_of_airline_codes" target="_blank">airline code reference</a>.
                                                </p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* General Pick Up Tab */}
                    <div className="tab-pane" id="tab_general">
                        <form className="form-horizontal" onSubmit={this.handleGeneralPreSubmit}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <input type="text"
                                               id="google-map-place2"
                                               className="form-control" 
                                               placeholder="Where to pick up you?"
                                               required
                                               ref="start2" />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                               id="google-map-place3"
                                               className="form-control" 
                                               placeholder="Where you want to go?"
                                               required
                                               ref="destination2" />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className='input-group date' id='datetimepicker2'>
                                            <input type='text' className="form-control"
                                                   placeholder="Your pick up time?"
                                                   required
                                                   style={{marginTop: '12px'}}
                                                   ref="datetime2" />
                                            <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <textarea
                                            className="form-control pick-requester-note"
                                            rows="1"
                                            placeholder="Any thing you want to mention?"
                                            ref="description2">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                                {/* General Pick Up Request Button */}
                                <button
                                    type="submit"
                                    style={{float: 'right'}}
                                    className="btn btn-primary">
                                    Post Your Request
                                </button>
                                {/* General Pick Up Request Confirm Modal */}
                                <div className="modal fade" id="general2-post-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Confirm Your Request</h4>
                                            </div>
                                            <hr style={{marginTop: "-10px"}}/>
                                            <div className="modal-body" id="general2-post-modal-body">
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-primary"
                                                        onClick={this.handleGeneralSubmit}>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
});