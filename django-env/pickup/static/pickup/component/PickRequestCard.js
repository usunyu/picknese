/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var PickRequestCard = React.createClass({displayName: 'PickRequestCard',
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
        layoutMap['heading']['action'] = "carpool";
        layoutMap['heading']['icon'] = "fontello-icon icon-cab";

        layoutMap['body'] = {}
        layoutMap['body']['start'] = {}
        layoutMap['body']['start']['class'] = 'col-md-10';
        layoutMap['body']['start']['title'] = 'Start';
        layoutMap['body']['start']['content'] = feed.start;
        layoutMap['body']['start']['icon'] = 'glyphicon glyphicon-tag';

        layoutMap['body']['dest'] = {}
        layoutMap['body']['dest']['class'] = 'col-md-10';
        layoutMap['body']['dest']['title'] = 'Destination';
        layoutMap['body']['dest']['content'] = feed.destination;
        layoutMap['body']['dest']['icon'] = 'glyphicon glyphicon-map-marker';

        layoutMap['body']['time'] = {}
        layoutMap['body']['time']['class'] = 'col-md-5';
        layoutMap['body']['time']['title'] = 'Pick Time';
        layoutMap['body']['time']['content'] = moment(feed.date_time).format("YYYY-MM-DD hh:mm A");
        layoutMap['body']['time']['icon'] = 'glyphicon glyphicon-time';

        layoutMap['body']['tip'] = {}
        layoutMap['body']['tip']['class'] = 'col-md-5';
        layoutMap['body']['tip']['title'] = 'Remuneration';
        layoutMap['body']['tip']['content'] = '$'.concat(feed.price);
        layoutMap['body']['tip']['icon'] = 'glyphicon glyphicon-credit-card';

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
            pick_request        : feed.id,
            picker              : current_user.id,
            requester           : feed.requester.id,
            description         : $("#pick-up-desc-textarea").val().trim(),
        });
    },
    getRequestUpdateForm: function() {
        var feed = this.props.feed;
        var additional_id = feed.feed_type + "-" + feed.id;
        return (
            React.createElement("form", {className: "form-horizontal", onSubmit: this.handlePostRequestSubmit}, 
                /* University Select */
                React.createElement(UniversitySelectInput, {
                    id: additional_id, 
                    defaultValue: feed.university.id, 
                    universitySimpleList: this.props.universitySimpleList}), 
                /* Pick Location Input */
                React.createElement(PickLocationTextInput, {
                    id: additional_id, 
                    defaultValue: feed.start}), 
                /* Pick Time Input */
                React.createElement(PickTimeTextInput, {
                    id: additional_id, 
                    defaultValue: moment(feed.date_time).format("MM/DD/YYYY hh:mm A")}), 
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
                            id: "post-request-submit-button" + additional_id, 
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
                cancelCallback: this.props.cancelCallback, 
                layout: layout})
        );
    }
});