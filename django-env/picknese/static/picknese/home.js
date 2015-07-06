/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var FIRST_LOAD_HOME_FEED_FINISH = false;

var HomePanel = React.createClass({displayName: 'HomePanel',
    mixins: [FeedActionMixin,
             UniversityActionMixin],
    componentWillMount: function() {
        // set for PostRequestInput
        CURRENT_PAGE = UPDATE_REQUEST_PAGE;
    },
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
                    'data-icon': "icon-th", 
                    key: ALL_POST, 
                    value: ALL_POST}, 
                    "All Post"
                ), 
                React.createElement("option", {
                    'data-icon': "icon-cab", 
                    key: PICK_REQUEST, 
                    value: PICK_REQUEST}, 
                    "Carpool Request"
                ), 
                React.createElement("option", {
                    'data-icon': "icon-flight", 
                    key: FLIGHT_PICK_REQUEST, 
                    value: FLIGHT_PICK_REQUEST}, 
                    "Flight Pick Request"
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
                            universitySimpleList: this.state.universitySimpleList, 
                            onSubmit: this.handlePickUpSubmit, 
                            onUpdate: this.handlePickRequestUpdate, 
                            onCancel: this.handlePickRequestCancel, 
                            mutateCallback: this.loadHomeFeedFromServer})
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        React.createElement(FlightPickRequestCard, {
                            key: i, 
                            feed: feed, 
                            universitySimpleList: this.state.universitySimpleList, 
                            onSubmit: this.handleFlightPickUpSubmit, 
                            onUpdate: this.handleFlightPickRequestUpdate, 
                            onCancel: this.handleFlightPickRequestCancel, 
                            mutateCallback: this.loadHomeFeedFromServer})
                    );
                    break;
                default:
                    break;
            }
        }
        if (homeFeedList.length == 0 && FIRST_LOAD_HOME_FEED_FINISH) {
            // add a dummy post if we have no feed
            homeFeedList.push(React.createElement(PusheenSadnessCard, {key: 0}));
        }
        if (homeFeedList.length == 0 && !FIRST_LOAD_HOME_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            homeFeedList.push(React.createElement(LoadingCard, {key: 0}));
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
        feedActionMixinLoadHomeFeedInterval: true, 
        universityActionMinxinLoadSimpleList: true, 
        pollInterval: 20000}),
    document.getElementById('content')
);