/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var HomePanel = React.createClass({
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
                        <PickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handlePickUpSubmit}
                            onCancel={this.handlePickRequestCancel} />
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        <FlightPickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handleFlightPickUpSubmit}
                            onCancel={this.handleFlightPickRequestCancel} />
                    );
                    break;
                default:
                    break;
            }
        }
        return (
            <div>
                {homeFeedList}
            </div>
        );
    }
});

React.render(
    <HomePanel
        homeFeedActionMixinLoadHomeFeedInterval={true}
        pollInterval={20000}/>,
    document.getElementById('content')
);