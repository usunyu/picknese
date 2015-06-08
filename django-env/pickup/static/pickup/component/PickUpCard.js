/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 */
var PickUpCard = React.createClass({displayName: 'PickUpCard',
    getCustomLayout: function() {
        var feed = this.props.feed;
        var layoutMap = {};

        layoutMap['heading'] = {};
        if (feed.picker.id == current_user.id) {
            layoutMap['heading']['user'] = "You";
            layoutMap['heading']['verb'] = "are taking this";
        } else {
            layoutMap['heading']['user'] = feed.picker.first_name + " " + feed.picker.last_name;
            layoutMap['heading']['verb'] = "is taking this";
        }
        layoutMap['heading']['action'] = "carpool request";
        layoutMap['heading']['icon'] = "fontello-icon icon-ok-circled";

        layoutMap['body'] = {}
        layoutMap['body']['sub_type'] = PICK_REQUEST;
        if (feed.description) {
            layoutMap['body']['message'] = {}
            layoutMap['body']['message']['class'] = 'col-md-12';
            layoutMap['body']['message']['title'] = 'Message';
            layoutMap['body']['message']['content'] = feed.description;
            layoutMap['body']['message']['icon'] = 'glyphicon glyphicon-comment';
        }

        return layoutMap;
    },
    render: function() {
        return (
            React.createElement(BasePickUpCard, {
                feed: this.props.feed, 
                onCancel: this.props.onCancel, 
                cancelCallback: this.props.cancelCallback, 
                onReject: this.props.onReject, 
                rejectCallback: this.props.rejectCallback, 
                layout: this.getCustomLayout()})
        );
    }
});