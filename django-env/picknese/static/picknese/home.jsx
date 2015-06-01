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
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();
    },
    onFeedTypeChange: function(event) {
        CURRENT_FEED_TYPE = event.target.value;
        this.loadHomeFeedFromServer();
    },
    getFeedTypeSelect: function() {
        return (
            <select
                className="selectpicker"
                data-style="btn-primary"
                onChange={this.onFeedTypeChange}>
                <option
                    data-icon="glyphicon-th-large"
                    key={ALL_POST}
                    value={ALL_POST}>
                    All Post
                </option>
                <option
                    data-icon="glyphicon-plane"
                    key={FLIGHT_PICK_REQUEST}
                    value={FLIGHT_PICK_REQUEST}>
                    Flight Pick Request
                </option>
                <option
                    data-icon="glyphicon-tag"
                    key={PICK_REQUEST}
                    value={PICK_REQUEST}>
                    Pick Request
                </option>
            </select>
        );
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
            <div className="col-sm-12 col-md-9 home-feed-card-div">
                <div className="hidden-sm hidden-md hidden-lg col-sm-12"
                     style={{paddingBottom: "5px"}}>
                    {this.getFeedTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    {homeFeedList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getFeedTypeSelect()}
                </div>
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