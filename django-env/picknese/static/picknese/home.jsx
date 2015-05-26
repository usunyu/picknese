/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var HomePanel = React.createClass({
    mixins: [HomeFeedActionMixin],
    componentDidUpdate: function() {
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
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        <FlightPickRequestCard
                            key={feed.id}
                            feed={feed} />
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
        pollInterval={20000}/>,
    document.getElementById('content')
);