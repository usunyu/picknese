/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @profile_user
 */
var INBOX_PANEL     = 1;
var REQUEST_PANEL   = 2;
var OFFER_PANEL     = 3;
var CALENDAR_PANEL  = 4;
var PHOTO_PANEL     = 5;
var SETTINGS_PANEL  = 6;

var CURRENT_PANEL = REQUEST_PANEL;

var FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH = false;
var FIRST_LOAD_PROFILE_OFFER_FEED_FINISH = false;

var MePanel = React.createClass({displayName: 'MePanel',
    mixins: [HomeFeedActionMixin,
             UniversityActionMixin],
    componentWillMount: function() {
        CURRENT_PAGE = UPDATE_REQUEST_PAGE;
    },
    componentDidMount: function() {
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();
    },
    onProfileInboxClick: function(event) {
        CURRENT_PANEL = INBOX_PANEL;
    },
    onProfileRequestClick: function(event) {
        if (CURRENT_PANEL == REQUEST_PANEL) {return;}
        CURRENT_PANEL = REQUEST_PANEL;
        this.loadProfileRequestFromServer();
    },
    onProfileOfferClick: function(event) {
        if (CURRENT_PANEL == OFFER_PANEL) {return;}
        CURRENT_PANEL = OFFER_PANEL;
        this.loadProfileOfferFromServer();
    },
    onProfileCalendarClick: function(event) {
        CURRENT_PANEL = CALENDAR_PANEL;
    },
    onProfilePictureClick: function(event) {
        CURRENT_PANEL = PHOTO_PANEL;
    },
    onProfileSettingsClick: function(event) {
        CURRENT_PANEL = SETTINGS_PANEL;
    },
    getProfileInboxList: function() {
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    React.createElement(PusheenGangnamStyleCard, {key: 0})
                )
            )
        );
    },
    getProfileRequestFeedList: function() {
        var profileFeedList = [];
        for (var i = 0; i < this.state.requests.length; i++) {
            var feed = this.state.requests[i];
            switch(feed.feed_type) {
                case PICK_REQUEST:
                    profileFeedList.push(
                        React.createElement(PickRequestCard, {
                            key: i, 
                            feed: feed, 
                            onSubmit: this.handlePickUpSubmit, 
                            onCancel: this.handlePickRequestCancel, 
                            cancelCallback: this.loadProfileRequestFromServer, 
                            universitySimpleList: this.state.universitySimpleList})
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    profileFeedList.push(
                        React.createElement(FlightPickRequestCard, {
                            key: i, 
                            feed: feed, 
                            onSubmit: this.handleFlightPickUpSubmit, 
                            onCancel: this.handleFlightPickRequestCancel, 
                            cancelCallback: this.loadProfileRequestFromServer})
                    );
                    break;
                case PICK_UP:
                    profileFeedList.push(
                        React.createElement(PickUpCard, {
                            key: i, 
                            feed: feed, 
                            onReject: this.handlePickUpReject, 
                            rejectCallback: this.loadProfileRequestFromServer})
                    );
                    break;
                case FLIGHT_PICK_UP:
                    profileFeedList.push(
                        React.createElement(FlightPickUpCard, {
                            key: i, 
                            feed: feed, 
                            onReject: this.handleFlightPickUpReject, 
                            rejectCallback: this.loadProfileRequestFromServer})
                    );
                default:
                    break;
            }
        }
        if (profileFeedList.length == 0 && FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH) {
            // add a dummy post if we have no feed
            profileFeedList.push(React.createElement(PusheenHappyCard, {key: 0}));
        }
        if (profileFeedList.length == 0 && !FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            profileFeedList.push(React.createElement(LoadingCard, {key: 0}));
        }
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12"}, 
                    this.getFeedRequestTypeSelect()
                ), 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    profileFeedList
                ), 
                React.createElement("div", {className: "hidden-xs col-sm-2 col-md-2"}, 
                    this.getFeedRequestTypeSelect()
                )
            )
        );
    },
    getProfileOfferFeedList: function() {
        var profileFeedList = [];
        for (var i = 0; i < this.state.offers.length; i++) {
            var feed = this.state.offers[i];
            switch(feed.feed_type) {
                case PICK_UP:
                    profileFeedList.push(
                        React.createElement(PickUpCard, {
                            key: i, 
                            feed: feed, 
                            onCancel: this.handlePickUpCancel, 
                            cancelCallback: this.loadProfileOfferFromServer})
                    );
                    break;
                case FLIGHT_PICK_UP:
                    profileFeedList.push(
                        React.createElement(FlightPickUpCard, {
                            key: i, 
                            feed: feed, 
                            onCancel: this.handleFlightPickUpCancel, 
                            cancelCallback: this.loadProfileOfferFromServer})
                    );
                default:
                    break;
            }
        }
        if (profileFeedList.length == 0 && FIRST_LOAD_PROFILE_OFFER_FEED_FINISH) {
            // add a dummy post if we have no feed
            profileFeedList.push(React.createElement(PusheenLazyCard, {key: 0}));
        }
        if (profileFeedList.length == 0 && !FIRST_LOAD_PROFILE_OFFER_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            profileFeedList.push(React.createElement(LoadingCard, {key: 0}));
        }
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12"}, 
                    this.getFeedOfferTypeSelect()
                ), 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    profileFeedList
                ), 
                React.createElement("div", {className: "hidden-xs col-sm-2 col-md-2"}, 
                    this.getFeedOfferTypeSelect()
                )
            )
        );
    },
    onFeedTypeChange: function(event) {
        CURRENT_FEED_TYPE = event.target.value;
        switch(CURRENT_PANEL) {
            case REQUEST_PANEL:
                this.loadProfileRequestFromServer();
                break;
            case OFFER_PANEL:
                this.loadProfileOfferFromServer();
                break;
            default:
                break;
        }
    },
    getFeedOfferTypeSelect: function() {
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
                    key: PICK_UP, 
                    value: PICK_UP}, 
                    "Carpool"
                ), 
                React.createElement("option", {
                    'data-icon': "icon-flight", 
                    key: FLIGHT_PICK_UP, 
                    value: FLIGHT_PICK_UP}, 
                    "Flight Pick Up"
                )
            )
        );
    },
    getFeedRequestTypeSelect: function() {
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
                    'data-icon': "icon-ok-circled", 
                    key: CONFIRMED_POST, 
                    value: CONFIRMED_POST}, 
                    "Confirmed"
                ), 
                React.createElement("option", {
                    'data-icon': "icon-cancel-circled", 
                    key: UNCONFIRMED_POST, 
                    value: UNCONFIRMED_POST}, 
                    "Pending"
                )
            )
        );
    },
    getProfileCalendar: function() {
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    React.createElement(PusheenGangnamStyleCard, {key: 0})
                )
            )
        );
    },
    getProfilePhoto: function() {
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    React.createElement(PusheenGangnamStyleCard, {key: 0})
                )
            )
        );
    },
    getProfileSettings: function() {
        return (
            React.createElement("div", {className: "col-sm-12 home-feed-card-div"}, 
                React.createElement("div", {className: "col-sm-9 col-md-10 home-feed-card-div"}, 
                    React.createElement(PusheenGangnamStyleCard, {key: 0})
                )
            )
        );
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("ul", {className: "nav nav-tabs nav-justified"}, 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-inbox", onClick: this.onProfileInboxClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-envelope"}), "  Inbox  ", React.createElement("span", {className: "badge"}, "7")
                        )
                    ), 
                    React.createElement("li", {className: "active"}, 
                        React.createElement("a", {href: "#profile-request", onClick: this.onProfileRequestClick, 'data-toggle': "tab", 'aria-expanded': "true"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-list-alt"}), "  Your Requests"
                        )
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-offer", onClick: this.onProfileOfferClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-heart"}), "  Your Offers"
                        )
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-calendar", onClick: this.onProfileCalendarClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-calendar"}), "  Calendar"
                        )
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-photo", onClick: this.onProfilePictureClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-picture"}), "  Your Photos"
                        )
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-settings", onClick: this.onProfileSettingsClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-cog"}), "  Account Settings"
                        )
                    )
                ), 

                React.createElement("div", {id: "profile-tab-content", className: "tab-content", style: {marginTop: "15px"}}, 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-inbox"}, 
                        this.getProfileInboxList()
                    ), 
                    React.createElement("div", {className: "tab-pane fade active in", id: "profile-request"}, 
                        this.getProfileRequestFeedList()
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-offer"}, 
                        this.getProfileOfferFeedList()
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-calendar"}, 
                        this.getProfileCalendar()
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-photo"}, 
                        this.getProfilePhoto()
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-settings"}, 
                        this.getProfileSettings()
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(MePanel, {
        homeFeedActionMixinLoadProfileRequestFeed: true, 
        universityActionMinxinLoadSimpleList: true}),
    document.getElementById('content')
);