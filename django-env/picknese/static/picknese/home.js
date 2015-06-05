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
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();
    },
    onFeedTypeChange: function(event) {
        CURRENT_FEED_TYPE = event.target.value;
        this.loadHomeFeedFromServer();
    },
    getFeedTypeSelect: function() {
        return (
            React.createElement("select", {
                className: "selectpicker", 
                'data-style': "btn-primary", 
                onChange: this.onFeedTypeChange}, 
                React.createElement("option", {
                    'data-icon': "glyphicon-th-large", 
                    key: ALL_POST, 
                    value: ALL_POST}, 
                    "All Post"
                ), 
                React.createElement("option", {
                    'data-icon': "glyphicon-plane", 
                    key: FLIGHT_PICK_REQUEST, 
                    value: FLIGHT_PICK_REQUEST}, 
                    "Flight Pick Request"
                ), 
                React.createElement("option", {
                    'data-icon': "glyphicon-tag", 
                    key: PICK_REQUEST, 
                    value: PICK_REQUEST}, 
                    "Pick Request"
                )
            )
        );
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
                            onSubmit: this.handlePickUpSubmit, 
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
            React.createElement("div", {className: "col-sm-12 col-md-9 home-feed-card-div"}, 
                React.createElement("div", {className: "feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12"}, 
                    this.getFeedTypeSelect()
                ), 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    homeFeedList
                ), 
                React.createElement("div", {className: "hidden-xs col-sm-2 col-md-2"}, 
                    this.getFeedTypeSelect()
                )
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