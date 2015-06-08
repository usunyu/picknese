/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var FIRST_LOAD_HOME_FEED_FINISH = false;

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
    onNoPostRequestButtonClick: function() {
        location.href = getPostRequestURL(university.id);
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
                            onCancel: this.handlePickRequestCancel, 
                            cancelCallback: this.loadHomeFeedFromServer})
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        React.createElement(FlightPickRequestCard, {
                            key: i, 
                            feed: feed, 
                            onSubmit: this.handleFlightPickUpSubmit, 
                            onCancel: this.handleFlightPickRequestCancel, 
                            cancelCallback: this.loadHomeFeedFromServer})
                    );
                    break;
                default:
                    break;
            }
        }
        if (homeFeedList.length == 0 && FIRST_LOAD_HOME_FEED_FINISH) {
            // add a dummy post if we have no feed
            homeFeedList.push(
                React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div", key: "no post card"}, 
                    React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                        React.createElement("b", null, "Current No Post To Show Yet! Be the first one to post:)")
                    ), 
                    React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                    React.createElement("div", {className: "panel-body", style: {backgroundColor: "#fcf0e4"}}, 
                        React.createElement("div", {className: "col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4"}, 
                            React.createElement("img", {src: getPusheenSadnessGif()})
                        ), 
                        React.createElement("button", {
                            type: "button", 
                            className: "btn btn-red col-xs-12", 
                            onClick: this.onNoPostRequestButtonClick}, 
                            "Post Your Request"
                        )
                    )
                )
            );
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