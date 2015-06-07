/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var PickRequestCard = React.createClass({
    getCustomLayout: function() {
        var feed = this.props.feed;
        var layoutMap = {};

        layoutMap['heading'] = {};
        layoutMap['heading']['verb'] = "is looking for";
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
        layoutMap['body']['time']['content'] = moment(feed.date_time).format("YYYY-MM-DD HH:mm");
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