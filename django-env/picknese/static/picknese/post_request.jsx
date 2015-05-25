/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 */
var CURRENT_REQUEST = PICK_REQUEST;

// Request Type => [Inputs Required]
var RequestTypeInputMap = new Map ([
    [PICK_REQUEST, [
        "pick-request-university-select",
        "pick-request-start-input",
        "pick-request-dest-input",
        "pick-request-tip-input",
    ]],
    [FLIGHT_PICK_REQUEST, [
        "pick-request-university-select",
        "flight-pick-request-flight-input",
        "pick-request-baggages-input",
        "flight-pick-request-date-input",
        "pick-request-dest-input",
        "pick-request-tip-input",
    ]],
]);

// Input => Input Valid Type
var InputValidTypeMap = new Map ([
    ["pick-request-baggages-input", "Integer"],
    ["pick-request-tip-input", "Integer"],
]);

function enablePostRequestSubmit() {
    var enableSubmit = true;
    var requiredInputs = RequestTypeInputMap.get(FLIGHT_PICK_REQUEST);
    for (var i = 0; i < requiredInputs.length && enableSubmit; i++) {
        var value = $("#" + requiredInputs[i]).val().trim();
        if (!value) { enableSubmit = false; }
        var validType = InputValidTypeMap.get(requiredInputs[i]);
        switch(validType) {
            case "Integer":
                if (!isInt(value)) { enableSubmit = false; }
                break;
            default:
                break;
        };
    }
    var submitButton = document.getElementById("post-request-submit-button");
    if (enableSubmit) {
        submitButton.disabled = "";
    } else {
        submitButton.disabled = "disabled";
    }
}

var PostRequestForm = React.createClass({
    mixins: [UniversityActionMixin],
    componentDidUpdate: function() {
        var universities = [];
        var selected = [];
        for (var i = 0; i < this.state.universitySimpleList.length; i++) {
            var data = this.state.universitySimpleList[i];
            var u = {
                id: data.id,
                title: data.name,
                search: data.shorthand + data.name,
            };
            universities.push(u);
            if (data.id == university.id) {
                selected.push(data.id);
            }
        }
        // Bind university type hint
        $('#pick-request-university-select').selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false,
            onBlur: function() {
                // Hack! Selectize not work well with Bootstrap
                var element = $('#pick-request-university-select');
                var value = element.val();
                var borderDiv = element.parent().children()[1].children[0];
                if (!value) {
                    element.parent().addClass("has-error");
                    borderDiv.style.borderColor = "#a94442";
                } else {
                    element.parent().removeClass("has-error");
                    borderDiv.style.borderColor = "";
                }
                enablePostRequestSubmit();
            },
        });
        // Hack! Have to bind change event like this way, since
        // Bootstrap data-toggle="buttons" is conflict with onChange
        $('input[name="request-type"]').change(function() {
            var currentInputs = RequestTypeInputMap.get(CURRENT_REQUEST);
            CURRENT_REQUEST = parseInt($(this).attr('id'));
            var needInputs = RequestTypeInputMap.get(CURRENT_REQUEST);

            var showInputs = arrayDiff(needInputs, currentInputs);
            var hideInputs = arrayDiff(currentInputs, needInputs);

            for (var i = 0; i < showInputs.length; i++) {
                var element = $("#" + showInputs[i]);
                element.parent().parent().addClass("fadein-effect");
                element.parent().parent().show();
            }
            for (var i = 0; i < hideInputs.length; i++) {
                var element = $("#" + hideInputs[i]);
                element.parent().parent().addClass("fadein-effect");
                element.parent().parent().hide();
            }
            enablePostRequestSubmit();
        });
        // Prepare google map api
        var pickRequestStartInput = document.getElementById("pick-request-start-input");
        var pickRequestDestInput = document.getElementById("pick-request-dest-input");
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestStartInput, mapOptions);
        new google.maps.places.Autocomplete(pickRequestDestInput, mapOptions);
        // Prepare date selector
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $('#flight-pick-request-date-div').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: today,
        });
    },
    onInputFocusLose: function(event) {
        var targetID = event.target.id;
        var element = $('#' + targetID);
        // Check input error
        var value = $("#" + targetID).val().trim();
        var inputError = value == "";
        var validType = InputValidTypeMap.get(targetID);
        switch(validType) {
            case "Integer":
                if (!isInt(value)) { inputError = true; }
                break;
            default:
                break;
        };
        if (inputError) {
            element.parent().addClass("has-error");
        } else {
            element.parent().removeClass("has-error");
        }
        enablePostRequestSubmit();
    },
    handlePostRequestSubmit: function(event) {
        event.preventDefault();
        $("#post-request-submit-button").button('loading');
        switch(CURRENT_REQUEST) {
            case PICK_REQUEST:
                break;
            case FLIGHT_PICK_REQUEST:
                var university  = this.refs.pickRequestUniversitySelect.getDOMNode().value.trim();
                var flight      = this.refs.flightPickRequestFlightInput.getDOMNode().value.trim();
                var baggages    = this.refs.pickRequestBaggagesInput.getDOMNode().value.trim();
                var date        = this.refs.flightPickRequestDateInput.getDOMNode().value.trim();
                var dest        = this.refs.pickRequestDestInput.getDOMNode().value.trim();
                var tip         = this.refs.pickRequestTipInput.getDOMNode().value.trim();
                // month is 0 indexed, http://momentjs.com/docs/#/get-set/month/
                var momentDate  = moment(date, 'MM/DD/YYYY');
                // load scheduled flight
                $.ajax({
                    url: getFlightStatusScheduledFlightAPI(flight, momentDate.year(), momentDate.month() + 1, momentDate.date()),
                    dataType: 'jsonp',
                    type: 'GET',
                    success: function(data) {
                        if (!isFlightStatusResultHasError(data)) {
                            console.log('has flight');
                            // this.setState({flightSchedulesData: data});
                            // $('#flight1-post-modal-body').html(
                            //     '<div class="row">' + 
                            //     '<p class="col-sm-6"><b>Flight Number: </b>' + flight + '</p>' +
                            //     '<p class="col-sm-6"><b>Baggage Number: </b>' + baggage + '</p>' +
                            //     '<p class="col-sm-6"><b>Departure Time: </b>' + getScheduledDepartureTimeFromResult(data) + '</p>' +
                            //     '<p class="col-sm-6"><b>Arrival Time: </b>' + getScheduledArrivalTimeFromResult(data) + '</p>' +
                            //     '<p class="col-sm-6"><b>From: </b>' + getScheduledDepartureAirportNameFromResult(data) + '</p>' +
                            //     '<p class="col-sm-6"><b>To: </b>' + getScheduledArrivalAirportNameFromResult(data) + '</p>' + 
                            //     '</div>'
                            // );
                            // $('#flight1-post-modal').modal('show');

                            // $('#flight1-post-button').button('reset');
                            $("#post-request-submit-button").button('reset');
                        } else {
                            console.log('no flight');
                            $('#flight-pick-request-error-modal-title').text("Cannot find schedule for " + flight);
                            $('#flight-pick-request-error-modal').modal('show');
                            $("#post-request-submit-button").button('reset');
                        }
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(
                            getFlightStatusScheduledFlightAPI(flight, momentDate.year(), momentDate.month() + 1, momentDate.date()),
                            status,
                            err.toString()
                        );
                    }.bind(this)
                });
                break;
            default:
                break;
        }
    },
    render: function() {
        return (
            <form className="form-horizontal" onSubmit={this.handlePostRequestSubmit}>
                {/* Request Type Tab */}
                <div className="form-group">
                    <label className="col-sm-2 control-label">I want to</label>
                    <div className="btn-group col-sm-10" data-toggle="buttons">
                        <label className="btn btn-white active">
                            <input
                                id={PICK_REQUEST}
                                type="radio"
                                name="request-type"
                                defaultChecked >
                                <i className="glyphicon glyphicon-bookmark"></i>&nbsp;Asking for Pick Up
                            </input>
                        </label>
                        <label className="btn btn-white">
                            <input
                                id={FLIGHT_PICK_REQUEST}
                                type="radio"
                                name="request-type" >
                                <i className="glyphicon glyphicon-plane"></i>&nbsp;Asking for Flight Pick Up
                            </input>
                        </label>
                    </div>
                </div>
                {/* University Select */}
                <div className="form-group">
                    <label className="col-sm-2 control-label">I study at</label>
                    <div className="col-sm-10">
                        <select id="pick-request-university-select" ref="pickRequestUniversitySelect" />
                    </div>
                </div>
                {/* Flight Number Input */}
                <div className="form-group" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I will take the flight</label>
                    <div className="col-sm-10">
                        <input
                            id="flight-pick-request-flight-input"
                            ref="flightPickRequestFlightInput"
                            type="text"
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="What's your flight number?" />
                    </div>
                </div>
                {/* Flight Baggages & Date Input */}
                <div className="form-group" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I have baggages</label>
                    <div className="col-sm-4">
                        <input 
                            id="pick-request-baggages-input"
                            ref="pickRequestBaggagesInput"
                            type="number"
                            className="form-control"
                            defaultValue={1}
                            onBlur={this.onInputFocusLose}
                            placeholder="How many bags do you have?" />
                    </div>
                    <label className="col-sm-2 control-label">I will arrive at</label>
                    <div className="col-sm-4">
                        <div className='input-group date' id='flight-pick-request-date-div'>
                            <input
                                id="flight-pick-request-date-input"
                                ref="flightPickRequestDateInput"
                                type='text'
                                className="form-control"
                                onBlur={this.onInputFocusLose}
                                placeholder="What's your arrival date?" />
                            <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={{display: 'none'}}>

                </div>
                {/* Pick Location Input */}
                <div className="form-group">
                    <label className="col-sm-2 control-label">I need be picked at</label>
                    <div className="col-sm-10">
                        <input
                            id="pick-request-start-input"
                            type="text"
                            className="form-control"
                            placeholder="Where you want to be picked up?" />
                    </div>
                </div>
                {/* Pick Dest Input */}
                <div className="form-group">
                    <label className="col-sm-2 control-label">I want to go to</label>
                    <div className="col-sm-10">
                        <input
                            id="pick-request-dest-input"
                            ref="pickRequestDestInput"
                            type="text"
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="Where you want to go?" />
                    </div>
                </div>
                {/* Pick Tip Input */}
                <div className="form-group">
                    <label className="col-sm-2 control-label">I can pay tip</label>
                    <div className="col-sm-4">
                        <input
                            id="pick-request-tip-input"
                            ref="pickRequestTipInput"
                            type="number"
                            defaultValue={20}
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="Remunerated is good :)" />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button
                            id="post-request-submit-button"
                            type="submit"
                            disabled="disabled"
                            className="btn btn-primary">
                            Continue
                        </button>
                    </div>
                </div>
                {/* Flight Pick Request Error Modal */}
                <div className="modal fade" id="flight-pick-request-error-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="flight-pick-request-error-modal-title">Cannot find flight schedule</h4>
                            </div>
                            <hr style={{marginTop: "-10px"}}/>
                            <div className="modal-body">
                                <p>Sorry, we cannot find any flight schedule based on your input, please try again and input the correct Date & Flight Number.</p>
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
            </form>
        );
    }
});

React.render(
    <PostRequestForm 
        universityActionMinxinLoadSimpleList={true} />,
    document.getElementById('content')
);

