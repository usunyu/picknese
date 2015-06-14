/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 *
 * Required Mixin
 * --------------------------------------------------
 * UniversityActionMixin
 * HomeFeedActionMixin
 */
var CURRENT_REQUEST = PICK_REQUEST;

var PostRequestForm = React.createClass({
    mixins: [UniversityActionMixin,
             HomeFeedActionMixin],
    componentWillMount: function() {
        CURRENT_PAGE = POST_REQUEST_PAGE;
    },
    componentDidMount: function() {
        // Hack! Have to bind change event like this way, since
        // Bootstrap data-toggle="buttons" is conflict with onChange
        $('input[name="request-type"]').change(function() {
            var currentInputs = RequestTypeInputMap[CURRENT_REQUEST];
            CURRENT_REQUEST = parseInt($(this).attr('id'));
            var needInputs = RequestTypeInputMap[CURRENT_REQUEST];

            var showInputs = arrayDiff(needInputs, currentInputs);
            var hideInputs = arrayDiff(currentInputs, needInputs);

            for (var i = 0; i < showInputs.length; i++) {
                var element = $("#" + showInputs[i]);
                while (element.attr('class').indexOf("form-group") == -1) {
                    element = element.parent();
                }
                element.addClass("fadein-effect");
                element.show();
            }
            for (var i = 0; i < hideInputs.length; i++) {
                var element = $("#" + hideInputs[i]);
                while (element.attr('class').indexOf("form-group") == -1) {
                    element = element.parent();
                }
                element.addClass("fadein-effect");
                element.hide();
            }
            enablePostRequestSubmit('');
        });
    },
    handlePostRequestSubmit: function(event) {
        event.preventDefault();
        $("#post-request-submit-button").button('loading');
        switch(CURRENT_REQUEST) {
            case PICK_REQUEST:
                request_data = {
                    university  : $("#" + UNIVERSITY_SELECT_ID).val().trim(),
                    price       : $("#" + TIP_INPUT_ID).val().trim(),
                    date_time   : moment($("#" + TIME_INPUT_ID).val().trim(), 'MM/DD/YYYY hh:mm A').format(),
                    start       : $("#" + START_INPUT_ID).val().trim(),
                    destination : $("#" + DEST_INPUT_ID).val().trim(),
                    feed_type   : PICK_REQUEST,
                    description : $("#" + DESC_TEXT_ID).val().trim(),
                };
                if (jQuery.isEmptyObject(current_user)) {
                    // need login to complete the request
                    $("#post-request-submit-button").button('reset');
                    $("#login-modal").modal('show');
                    return;
                }
                request_data.requester = current_user.id;
                this.handlePickRequestSubmit(request_data);
                $("#post-request-submit-button").button('reset');
                break;
            case FLIGHT_PICK_REQUEST:
                var flight = $("#flight-pick-request-flight-input").val().trim().toUpperCase();
                // month is 0 indexed, http://momentjs.com/docs/#/get-set/month/
                var momentDate = moment($("#flight-pick-request-date-input").val().trim(), 'MM/DD/YYYY');
                // load scheduled flight
                $.ajax({
                    url: getFlightStatusScheduledFlightAPI(flight, momentDate.year(), momentDate.month() + 1, momentDate.date()),
                    dataType: 'jsonp',
                    type: 'GET',
                    success: function(data) {
                        if (!isFlightStatusResultHasError(data)) {
                            request_data = {
                                requester   : current_user.id,
                                university  : $("#" + UNIVERSITY_SELECT_ID).val().trim(),
                                price       : $("#" + TIP_INPUT_ID).val().trim(),
                                flight      : flight,
                                date_time   : getScheduledArrivalTimeFromResult(data),
                                destination : $("#" + DEST_INPUT_ID).val().trim(),
                                bags        : $("#pick-request-baggages-input").val().trim(),
                                feed_type   : FLIGHT_PICK_REQUEST,
                                description : $("#" + DESC_TEXT_ID).val().trim(),
                            }
                            if (jQuery.isEmptyObject(current_user)) {
                                // need login to complete the request
                                $("#post-request-submit-button").button('reset');
                                $("#login-modal").modal('show');
                                return;
                            }
                            request_data.requester = current_user.id;

                            this.handleFlightPickRequestSubmit(request_data);
                            $("#post-request-submit-button").button('reset');
                        } else {
                            $('#flight-pick-request-error-modal-title').text("Cannot Find Flight Schedule For " + flight);
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
                    <label className="col-sm-2 control-label">Request</label>
                    <div className="btn-group col-sm-10" data-toggle="buttons">
                        <label className="btn btn-white btn-post-tab active">
                            <input
                                id={PICK_REQUEST}
                                type="radio"
                                name="request-type"
                                defaultChecked >
                                <i className="glyphicon glyphicon-bookmark"></i>&nbsp;Asking for Carpool
                            </input>
                        </label>
                        <label className="btn btn-white btn-post-tab">
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
                <UniversitySelectInput
                    defaultValue={null}
                    universitySimpleList={this.state.universitySimpleList} />
                {/* Flight Number Input */}
                <FlightNumberTextInput
                    display={'none'}
                    defaultValue={null} />
                {/* Flight Baggages & Date Input */}
                <FlightBaggagesAndDateInput
                    display={'none'}
                    defaultDate={null}
                    defaultBaggages={1} />
                {/* Pick Location Input */}
                <PickLocationTextInput
                    defaultValue={null} />
                {/* Pick Time Input */}
                <PickTimeTextInput
                    defaultValue={null} />
                {/* Pick Dest Input */}
                <PickDestTextInput
                    defaultValue={null} />
                {/* Pick Tip Input */}
                <PickTipNumberInput
                    defaultValue={20} />
                {/* Message Input */}
                <MessageTextareaInput
                    defaultValue={null} />
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
                            <div className="modal-header background-color-warning">
                                <button
                                    type="button"
                                    className="close color-white"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5
                                    id="flight-pick-request-error-modal-title"
                                    className="modal-title color-white">
                                    Cannot Find Flight Schedule
                                </h5>
                            </div>
                            <div className="modal-body">
                                <p>Sorry! we cannot find any flight schedule based on your input, please try again and make sure input the correct Date & Flight Number.</p>
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

