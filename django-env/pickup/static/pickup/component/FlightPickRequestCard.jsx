/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var FlightPickRequestCard = React.createClass({
    getCustomLayout: function() {
        var feed = this.props.feed;
        var layoutMap = {};

        layoutMap['heading'] = {};
        layoutMap['heading']['verb'] = "is looking for";
        layoutMap['heading']['action'] = "flight pick up";
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
        layoutMap['body']['time']['content'] = moment(feed.date_time).format("YYYY-MM-DD HH:mm");
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
    render: function() {
        var feed = this.props.feed;
        var layout = this.getCustomLayout();
        return (
            <BaseRequestCard
                feed={this.props.feed}
                onSubmit={this.onSubmit}
                onCancel={this.props.onCancel}
                cancelCallback={this.props.cancelCallback}
                layout={layout} />
        );
    }
});