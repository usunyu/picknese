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

var MePanel = React.createClass({
    mixins: [FeedActionMixin,
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
            <div className="col-sm-12 home-feed-card-div">
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    <PusheenGangnamStyleCard key={0} />
                </div>
            </div>
        );
    },
    getProfileRequestFeedList: function() {
        var profileFeedList = [];
        for (var i = 0; i < this.state.requests.length; i++) {
            var feed = this.state.requests[i];
            switch(feed.feed_type) {
                case PICK_REQUEST:
                    profileFeedList.push(
                        <PickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handlePickUpSubmit}
                            onCancel={this.handlePickRequestCancel}
                            mutateCallback={this.loadProfileRequestFromServer}
                            universitySimpleList={this.state.universitySimpleList} />
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    profileFeedList.push(
                        <FlightPickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handleFlightPickUpSubmit}
                            onUpdate={this.handleFlightPickRequestUpdate}
                            onCancel={this.handleFlightPickRequestCancel}
                            mutateCallback={this.loadProfileRequestFromServer}
                            universitySimpleList={this.state.universitySimpleList} />
                    );
                    break;
                case PICK_UP:
                    profileFeedList.push(
                        <PickUpCard
                            key={i}
                            feed={feed}
                            onReject={this.handlePickUpReject}
                            mutateCallback={this.loadProfileRequestFromServer} />
                    );
                    break;
                case FLIGHT_PICK_UP:
                    profileFeedList.push(
                        <FlightPickUpCard
                            key={i}
                            feed={feed}
                            onReject={this.handleFlightPickUpReject}
                            mutateCallback={this.loadProfileRequestFromServer} />
                    );
                default:
                    break;
            }
        }
        if (profileFeedList.length == 0 && FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH) {
            // add a dummy post if we have no feed
            profileFeedList.push(<PusheenHappyCard key={0} />);
        }
        if (profileFeedList.length == 0 && !FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            profileFeedList.push(<LoadingCard key={0} />);
        }
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12">
                    {this.getFeedRequestTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    {profileFeedList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getFeedRequestTypeSelect()}
                </div>
            </div>
        );
    },
    getProfileOfferFeedList: function() {
        var profileFeedList = [];
        for (var i = 0; i < this.state.offers.length; i++) {
            var feed = this.state.offers[i];
            switch(feed.feed_type) {
                case PICK_UP:
                    profileFeedList.push(
                        <PickUpCard
                            key={i}
                            feed={feed}
                            onCancel={this.handlePickUpCancel}
                            mutateCallback={this.loadProfileOfferFromServer} />
                    );
                    break;
                case FLIGHT_PICK_UP:
                    profileFeedList.push(
                        <FlightPickUpCard
                            key={i}
                            feed={feed}
                            onCancel={this.handleFlightPickUpCancel}
                            mutateCallback={this.loadProfileOfferFromServer} />
                    );
                default:
                    break;
            }
        }
        if (profileFeedList.length == 0 && FIRST_LOAD_PROFILE_OFFER_FEED_FINISH) {
            // add a dummy post if we have no feed
            profileFeedList.push(<PusheenLazyCard key={0} />);
        }
        if (profileFeedList.length == 0 && !FIRST_LOAD_PROFILE_OFFER_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            profileFeedList.push(<LoadingCard key={0} />);
        }
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12">
                    {this.getFeedOfferTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    {profileFeedList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getFeedOfferTypeSelect()}
                </div>
            </div>
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
            <select
                className="selectpicker"
                data-style="btn-primary"
                onChange={this.onFeedTypeChange}>
                <option
                    data-icon="icon-th"
                    key={ALL_POST}
                    value={ALL_POST}>
                    All Post
                </option>
                <option
                    data-icon="icon-cab"
                    key={PICK_UP}
                    value={PICK_UP}>
                    Carpool
                </option>
                <option
                    data-icon="icon-flight"
                    key={FLIGHT_PICK_UP}
                    value={FLIGHT_PICK_UP}>
                    Flight Pick Up
                </option>
            </select>
        );
    },
    getFeedRequestTypeSelect: function() {
        return (
            <select
                className="selectpicker"
                data-style="btn-primary"
                onChange={this.onFeedTypeChange}>
                <option
                    data-icon="icon-th"
                    key={ALL_POST}
                    value={ALL_POST}>
                    All Post
                </option>
                <option
                    data-icon="icon-ok-circled"
                    key={CONFIRMED_POST}
                    value={CONFIRMED_POST}>
                    Confirmed
                </option>
                <option
                    data-icon="icon-cancel-circled"
                    key={UNCONFIRMED_POST}
                    value={UNCONFIRMED_POST}>
                    Pending
                </option>
            </select>
        );
    },
    getProfileCalendar: function() {
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    <PusheenGangnamStyleCard key={0} />
                </div>
            </div>
        );
    },
    getProfilePhoto: function() {
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    <PusheenGangnamStyleCard key={0} />
                </div>
            </div>
        );
    },
    getProfileSettings: function() {
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    <PusheenGangnamStyleCard key={0} />
                </div>
            </div>
        );
    },
    render: function() {
        return (
            <div>
                <ul className="nav nav-tabs nav-justified">
                    <li>
                        <a href="#profile-inbox" onClick={this.onProfileInboxClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-envelope"></span>&nbsp; Inbox &nbsp;<span className="badge">7</span>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#profile-request" onClick={this.onProfileRequestClick} data-toggle="tab" aria-expanded="true">
                            <span className="glyphicon glyphicon-list-alt"></span>&nbsp; Your Requests
                        </a>
                    </li>
                    <li>
                        <a href="#profile-offer" onClick={this.onProfileOfferClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-heart"></span>&nbsp; Your Offers
                        </a>
                    </li>
                    <li>
                        <a href="#profile-calendar" onClick={this.onProfileCalendarClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-calendar"></span>&nbsp; Calendar
                        </a>
                    </li>
                    <li>
                        <a href="#profile-photo" onClick={this.onProfilePictureClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-picture"></span>&nbsp; Your Photos
                        </a>
                    </li>
                    <li>
                        <a href="#profile-settings" onClick={this.onProfileSettingsClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-cog"></span>&nbsp; Account Settings
                        </a>
                    </li>
                </ul>

                <div id="profile-tab-content" className="tab-content" style={{marginTop: "15px"}}>
                    <div className="tab-pane fade" id="profile-inbox">
                        {this.getProfileInboxList()}
                    </div>
                    <div className="tab-pane fade active in" id="profile-request">
                        {this.getProfileRequestFeedList()}
                    </div>
                    <div className="tab-pane fade" id="profile-offer">
                        {this.getProfileOfferFeedList()}
                    </div>
                    <div className="tab-pane fade" id="profile-calendar">
                        {this.getProfileCalendar()}
                    </div>
                    <div className="tab-pane fade" id="profile-photo">
                        {this.getProfilePhoto()}
                    </div>
                    <div className="tab-pane fade" id="profile-settings">
                        {this.getProfileSettings()}
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <MePanel 
        feedActionMixinLoadProfileRequestFeed={true}
        universityActionMinxinLoadSimpleList={true} />,
    document.getElementById('content')
);