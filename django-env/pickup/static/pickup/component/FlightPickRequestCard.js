/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var FlightPickRequestCard = React.createClass({displayName: 'FlightPickRequestCard',
    getCustomLayout: function() {
        var feed = this.props.feed;
        var layoutMap = {};

        layoutMap['heading'] = {};
        if (feed.requester.id == current_user.id) {
            layoutMap['heading']['user'] = "You";
            layoutMap['heading']['verb'] = "are looking for";
        } else {
            layoutMap['heading']['user'] = feed.requester.first_name + " " + feed.requester.last_name;
            layoutMap['heading']['verb'] = "is looking for";
        }
        layoutMap['heading']['action'] = "Flight Pick Up";
        layoutMap['heading']['icon'] = "fontello-icon icon-flight";

        layoutMap['body'] = {}
        layoutMap['body']['flight'] = {}
        layoutMap['body']['flight']['class'] = 'col-md-5';
        layoutMap['body']['flight']['title'] = 'Flight Number';
        layoutMap['body']['flight']['content'] = feed.flight;
        layoutMap['body']['flight']['icon'] = 'glyphicon glyphicon-tag';

        layoutMap['body']['time'] = {}
        layoutMap['body']['time']['class'] = 'col-md-5';
        layoutMap['body']['time']['title'] = 'Arrival Time';
        layoutMap['body']['time']['content'] = moment(feed.date_time).format("YYYY-MM-DD hh:mm A");
        layoutMap['body']['time']['icon'] = 'glyphicon glyphicon-time';

        layoutMap['body']['dest'] = {}
        layoutMap['body']['dest']['class'] = 'col-md-10';
        layoutMap['body']['dest']['title'] = 'Destination';
        layoutMap['body']['dest']['content'] = feed.destination;
        layoutMap['body']['dest']['icon'] = 'glyphicon glyphicon-map-marker';

        layoutMap['body']['tip'] = {}
        layoutMap['body']['tip']['class'] = 'col-md-5';
        layoutMap['body']['tip']['title'] = 'Remuneration';
        layoutMap['body']['tip']['content'] = '$'.concat(feed.price);
        layoutMap['body']['tip']['icon'] = 'glyphicon glyphicon-credit-card';

        layoutMap['body']['bags'] = {}
        layoutMap['body']['bags']['class'] = 'col-md-5';
        layoutMap['body']['bags']['title'] = 'Baggage Number';
        layoutMap['body']['bags']['content'] = feed.bags;
        layoutMap['body']['bags']['icon'] = 'glyphicon glyphicon-briefcase';

        if (feed.description) {
            layoutMap['body']['message'] = {}
            layoutMap['body']['message']['class'] = 'col-md-10';
            layoutMap['body']['message']['title'] = 'Message';
            layoutMap['body']['message']['content'] = feed.description;
            layoutMap['body']['message']['icon'] = 'glyphicon glyphicon-comment';
        }

        return layoutMap;
    },
    onSubmit: function() {
        var feed = this.props.feed;
        this.props.onSubmit({
            flight_pick_request : feed.id,
            picker              : current_user.id,
            requester           : feed.requester.id,
            description         : $("#pick-up-desc-textarea").val().trim(),
        });
    },
    handleRequestUpdate: function(event) {
        event.preventDefault();
        var feed = this.props.feed;
        var additional_id = feed.feed_type + "-" + feed.id;
        $("#" + REQUEST_SUBMIT_BUTTON_ID + additional_id).button('loading');
        var flight = $("#" + FLIGHT_INPUT_ID + additional_id).val().trim().toUpperCase();
        var momentDate = moment($("#" + DATE_INPUT_ID + additional_id).val().trim(), 'MM/DD/YYYY');

        var flight_input = $('#' + FLIGHT_INPUT_ID + additional_id);

        $.ajax({
            url: getFlightStatusScheduledFlightAPI(flight, momentDate.year(), momentDate.month() + 1, momentDate.date()),
            dataType: 'jsonp',
            type: 'GET',
            success: function(data) {
                if (!isFlightStatusResultHasError(data)) {
                    flight_input.parent().removeClass("has-error");

                    var update_data = {
                        id          : feed.id,
                        requester   : current_user.id,
                        university  : $("#" + UNIVERSITY_SELECT_ID + additional_id).val().trim(),
                        price       : $("#" + TIP_INPUT_ID + additional_id).val().trim(),
                        flight      : flight,
                        date_time   : getScheduledArrivalTimeFromResult(data),
                        destination : $("#" + DEST_INPUT_ID + additional_id).val().trim(),
                        bags        : $("#" + BAGS_INPUT_ID + additional_id).val().trim(),
                        feed_type   : FLIGHT_PICK_REQUEST,
                        description : $("#" + DESC_TEXT_ID + additional_id).val().trim(),
                    }

                    this.props.onUpdate(update_data, this.props.mutateCallback);
                    $("#" + REQUEST_SUBMIT_BUTTON_ID + additional_id).button('reset');
                } else {
                    flight_input.parent().effect("shake", {times:3, distance: 5}, 500);
                    flight_input.parent().addClass("has-error");
                    $("#" + REQUEST_SUBMIT_BUTTON_ID + additional_id).button('reset');
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
    },
    getRequestUpdateForm: function() {
        var feed = this.props.feed;
        var additional_id = feed.feed_type + "-" + feed.id;
        return (
            React.createElement("form", {className: "form-horizontal", onSubmit: this.handleRequestUpdate}, 
                /* University Select */
                React.createElement(UniversitySelectInput, {
                    id: additional_id, 
                    defaultValue: feed.university.id, 
                    universitySimpleList: this.props.universitySimpleList}), 
                /* Flight Number Input */
                React.createElement(FlightNumberTextInput, {
                    id: additional_id, 
                    defaultValue: feed.flight}), 
                /* Flight Baggages & Date Input */
                React.createElement(FlightBaggagesAndDateInput, {
                    id: additional_id, 
                    defaultDate: moment(feed.date_time).format("MM/DD/YYYY"), 
                    defaultBaggages: feed.bags}), 
                /* Pick Dest Input */
                React.createElement(PickDestTextInput, {
                    id: additional_id, 
                    defaultValue: feed.destination}), 
                /* Pick Tip Input */
                React.createElement(PickTipNumberInput, {
                    id: additional_id, 
                    defaultValue: feed.price}), 
                /* Message Input */
                React.createElement(MessageTextareaInput, {
                    id: additional_id, 
                    defaultValue: feed.description}), 
                /* Submit Button */
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                        React.createElement("button", {
                            id: REQUEST_SUBMIT_BUTTON_ID + additional_id, 
                            type: "submit", 
                            disabled: "disabled", 
                            className: "btn btn-primary"}, 
                            "Update"
                        )
                    )
                )
            )
        );
    },
    render: function() {
        var feed = this.props.feed;
        var layout = this.getCustomLayout();
        return (
            React.createElement(BaseRequestCard, {
                feed: this.props.feed, 
                updateForm: this.getRequestUpdateForm(), 
                onSubmit: this.onSubmit, 
                onCancel: this.props.onCancel, 
                mutateCallback: this.props.mutateCallback, 
                layout: layout})
        );
    }
});