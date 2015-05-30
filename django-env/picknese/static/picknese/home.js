/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var HomePanel = React.createClass({displayName: 'HomePanel',
    mixins: [HomeFeedActionMixin],
    componentDidMount: function() {
        if (hasPopupMessage()) {
            setTimeout(function() { popupMessage(); }, 500);
        }
    },
    render: function() {
        var homeFeedList = [];
        for (var i = 0; i < this.state.feeds.length; i++) {
            var feed = this.state.feeds[i];
            switch(feed.feed_type) {
                case PICK_REQUEST:
                    homeFeedList.push(
                        React.createElement(PickRequestCard, {
                            key: i, 
                            feed: feed, 
                            onCancel: this.handlePickRequestCancel})
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        React.createElement(FlightPickRequestCard, {
                            key: i, 
                            feed: feed, 
                            onSubmit: this.handleFlightPickUpSubmit, 
                            onCancel: this.handleFlightPickRequestCancel})
                    );
                    break;
                default:
                    break;
            }
        }
        return (
            React.createElement("div", null, 
                homeFeedList
            )
        );
    }
});

React.render(
    React.createElement(HomePanel, {
        homeFeedActionMixinLoadHomeFeedInterval: true, 
        pollInterval: 20000}),
    document.getElementById('content')
);