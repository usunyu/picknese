/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 *
 * Required Mixin
 * --------------------------------------------------
 * UniversityActionMixin
 * FeedActionMixin
 */
var CURRENT_REQUEST = PICK_REQUEST;

var PostRequestForm = React.createClass({displayName: 'PostRequestForm',
    mixins: [UniversityActionMixin,
             FeedActionMixin],
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
        $("#" + REQUEST_SUBMIT_BUTTON_ID).button('loading');
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
                    $("#" + REQUEST_SUBMIT_BUTTON_ID).button('reset');
                    $("#login-modal").modal('show');
                    return;
                }
                request_data.requester = current_user.id;
                this.handlePickRequestSubmit(request_data);
                $("#" + REQUEST_SUBMIT_BUTTON_ID).button('reset');
                break;
            case FLIGHT_PICK_REQUEST:
                var flight = $("#" + FLIGHT_INPUT_ID).val().trim().toUpperCase();
                // month is 0 indexed, http://momentjs.com/docs/#/get-set/month/
                var momentDate = moment($("#" + DATE_INPUT_ID).val().trim(), 'MM/DD/YYYY');
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
                                bags        : $("#" + BAGS_INPUT_ID).val().trim(),
                                feed_type   : FLIGHT_PICK_REQUEST,
                                description : $("#" + DESC_TEXT_ID).val().trim(),
                            }
                            if (jQuery.isEmptyObject(current_user)) {
                                // need login to complete the request
                                $("#" + REQUEST_SUBMIT_BUTTON_ID).button('reset');
                                $("#login-modal").modal('show');
                                return;
                            }
                            request_data.requester = current_user.id;

                            this.handleFlightPickRequestSubmit(request_data);
                            $("#" + REQUEST_SUBMIT_BUTTON_ID).button('reset');
                        } else {
                            $('#flight-pick-request-error-modal-title').text("Cannot Find Flight Schedule For " + flight);
                            $('#flight-pick-request-error-modal').modal('show');
                            $("#" + REQUEST_SUBMIT_BUTTON_ID).button('reset');
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
            React.createElement("form", {className: "form-horizontal", onSubmit: this.handlePostRequestSubmit}, 
                /* Request Type Tab */
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "Request"), 
                    React.createElement("div", {className: "btn-group col-sm-10", 'data-toggle': "buttons"}, 
                        React.createElement("label", {className: "btn btn-white btn-post-tab active"}, 
                            React.createElement("input", {
                                id: PICK_REQUEST, 
                                type: "radio", 
                                name: "request-type", 
                                defaultChecked: true}, 
                                React.createElement("i", {className: "glyphicon glyphicon-bookmark"}), " Asking for Carpool"
                            )
                        ), 
                        React.createElement("label", {className: "btn btn-white btn-post-tab"}, 
                            React.createElement("input", {
                                id: FLIGHT_PICK_REQUEST, 
                                type: "radio", 
                                name: "request-type"}, 
                                React.createElement("i", {className: "glyphicon glyphicon-plane"}), " Asking for Flight Pick Up"
                            )
                        )
                    )
                ), 
                /* University Select */
                React.createElement(UniversitySelectInput, {
                    defaultValue: null, 
                    universitySimpleList: this.state.universitySimpleList}), 
                /* Flight Number Input */
                React.createElement(FlightNumberTextInput, {
                    display: 'none', 
                    defaultValue: null}), 
                /* Flight Baggages & Date Input */
                React.createElement(FlightBaggagesAndDateInput, {
                    display: 'none', 
                    defaultDate: null, 
                    defaultBaggages: 1}), 
                /* Pick Location Input */
                React.createElement(PickLocationTextInput, {
                    defaultValue: null}), 
                /* Pick Time Input */
                React.createElement(PickTimeTextInput, {
                    defaultValue: null}), 
                /* Pick Dest Input */
                React.createElement(PickDestTextInput, {
                    defaultValue: null}), 
                /* Pick Tip Input */
                React.createElement(PickTipNumberInput, {
                    defaultValue: 20}), 
                /* Message Input */
                React.createElement(MessageTextareaInput, {
                    defaultValue: null}), 
                /* Submit Button */
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                        React.createElement("button", {
                            id: REQUEST_SUBMIT_BUTTON_ID, 
                            type: "submit", 
                            disabled: "disabled", 
                            className: "btn btn-primary"}, 
                            "Continue"
                        )
                    )
                ), 
                /* Flight Pick Request Error Modal */
                React.createElement("div", {className: "modal fade", id: "flight-pick-request-error-modal", tabIndex: "-1", role: "dialog", 'aria-hidden': "true"}, 
                    React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header background-color-warning"}, 
                                React.createElement("button", {
                                    type: "button", 
                                    className: "close color-white", 
                                    'data-dismiss': "modal", 
                                    'aria-label': "Close"}, 
                                    React.createElement("span", {'aria-hidden': "true"}, "×")
                                ), 
                                React.createElement("h5", {
                                    id: "flight-pick-request-error-modal-title", 
                                    className: "modal-title color-white"}, 
                                    "Cannot Find Flight Schedule"
                                )
                            ), 
                            React.createElement("div", {className: "modal-body"}, 
                                React.createElement("p", null, "Sorry! we cannot find any flight schedule based on your input, please try again and make sure input the correct Date & Flight Number."), 
                                React.createElement("p", null, "For the date, please input the arrival date as format MM/DD/YYYY."), 
                                React.createElement("p", null, "For the flight number, please input as format CSN327, for the" + ' ' + 
                                    " ", React.createElement("a", {href: "http://en.wikipedia.org/wiki/List_of_airline_codes", target: "_blank"}, "airline code reference"), "."
                                )
                            ), 
                            React.createElement("div", {className: "modal-footer"}, 
                                React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Close")
                            )
                        )
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(PostRequestForm, {
        universityActionMinxinLoadSimpleList: true}),
    document.getElementById('content')
);

