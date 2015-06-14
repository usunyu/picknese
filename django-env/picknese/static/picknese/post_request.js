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

// Request Type => [Inputs Required]
var RequestTypeInputMap = {};
RequestTypeInputMap[PICK_REQUEST] = [
    "pick-request-university-select",
    "pick-request-start-input",
    "pick-request-time-input",
    "pick-request-dest-input",
    "pick-request-tip-input",
];
RequestTypeInputMap[FLIGHT_PICK_REQUEST] = [
    "pick-request-university-select",
    "flight-pick-request-flight-input",
    "pick-request-baggages-input",
    "flight-pick-request-date-input",
    "pick-request-dest-input",
    "pick-request-tip-input",
];

// Input => Input Valid Type
var InputValidTypeMap = {};
InputValidTypeMap["pick-request-baggages-input"] = "Integer";
InputValidTypeMap["pick-request-tip-input"] = "Integer";

function enablePostRequestSubmit() {
    var enableSubmit = true;
    var requiredInputs = RequestTypeInputMap[CURRENT_REQUEST];
    for (var i = 0; i < requiredInputs.length && enableSubmit; i++) {
        var value = $("#" + requiredInputs[i]).val().trim();
        if (!value) { enableSubmit = false; }
        var validType = InputValidTypeMap[requiredInputs[i]];
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

var PostRequestForm = React.createClass({displayName: 'PostRequestForm',
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
            enablePostRequestSubmit();
        });
    },
    onInputFocusLose: function(event) {
        var targetID = event.target.id;
        var element = $('#' + targetID);
        // Check input error
        var value = $("#" + targetID).val().trim();
        var inputError = value == "";
        var validType = InputValidTypeMap[targetID];
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
                request_data = {
                    university  : $("#pick-request-university-select").val().trim(),
                    price       : $("#pick-request-tip-input").val().trim(),
                    date_time   : moment($("#pick-request-time-input").val().trim(), 'MM/DD/YYYY hh:mm A').format(),
                    start       : $("#pick-request-start-input").val().trim(),
                    destination : $("#pick-request-dest-input").val().trim(),
                    feed_type   : PICK_REQUEST,
                    description : $("#pick-request-desc-textarea").val().trim(),
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
                                university  : $("#pick-request-university-select").val().trim(),
                                price       : $("#pick-request-tip-input").val().trim(),
                                flight      : flight,
                                date_time   : getScheduledArrivalTimeFromResult(data),
                                destination : $("#pick-request-dest-input").val().trim(),
                                bags        : $("#pick-request-baggages-input").val().trim(),
                                feed_type   : FLIGHT_PICK_REQUEST,
                                description : $("#pick-request-desc-textarea").val().trim(),
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
                    defaultValue: null, 
                    onBlur: this.onInputFocusLose}), 
                /* Flight Baggages & Date Input */
                React.createElement(FlightBaggagesAndDateInput, {
                    display: 'none', 
                    defaultDate: null, 
                    defaultBaggages: 1, 
                    onBlur: this.onInputFocusLose}), 
                /* Pick Location Input */
                React.createElement(PickLocationTextInput, {
                    defaultValue: null, 
                    onBlur: this.onInputFocusLose}), 
                /* Pick Time Input */
                React.createElement(PickTimeTextInput, {
                    defaultValue: null, 
                    onBlur: this.onInputFocusLose}), 
                /* Pick Dest Input */
                React.createElement(PickDestTextInput, {
                    defaultValue: null, 
                    onBlur: this.onInputFocusLose}), 
                /* Pick Tip Input */
                React.createElement(PickTipNumberInput, {
                    defaultValue: 20, 
                    onBlur: this.onInputFocusLose}), 
                /* Message Input */
                React.createElement(MessageTextareaInput, {
                    defaultValue: null}), 
                /* Submit Button */
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                        React.createElement("button", {
                            id: "post-request-submit-button", 
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

