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

var MePanel = React.createClass({
    mixins: [HomeFeedActionMixin],
    componentDidMount: function() {
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();
    },
    onProfileInboxClick: function(event) {
        CURRENT_PANEL = INBOX_PANEL;
    },
    onProfileRequestClick: function(event) {
        CURRENT_PANEL = REQUEST_PANEL;
        this.loadProfileRequestFromServer();
    },
    onProfileOfferClick: function(event) {
        CURRENT_PANEL = OFFER_PANEL;
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
                            cancelCallback={this.loadProfileRequestFromServer} />
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    profileFeedList.push(
                        <FlightPickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handleFlightPickUpSubmit}
                            onCancel={this.handleFlightPickRequestCancel}
                            cancelCallback={this.loadProfileRequestFromServer} />
                    );
                    break;
                case FLIGHT_PICK_UP:
                    profileFeedList.push(
                        <FlightPickUpCard
                            key={i}
                            feed={feed}
                            onCancel={null}
                            cancelCallback={this.loadProfileRequestFromServer}
                            onReject={null}
                            rejectCallback={this.loadProfileRequestFromServer} />
                    );
                default:
                    break;
            }
        }
        return (
            <div className="col-sm-12 col-md-offset-2 col-md-9 home-feed-card-div">
                <div className="feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12">
                    {this.getFeedTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    {profileFeedList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getFeedTypeSelect()}
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
                
                break;
            default:
                break;
        }
    },
    getFeedTypeSelect: function() {
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
                        <p>inbox</p>
                    </div>
                    <div className="tab-pane fade active in" id="profile-request">
                        {this.getProfileRequestFeedList()}
                    </div>
                    <div className="tab-pane fade" id="profile-offer">
                        <p>offer</p>
                    </div>
                    <div className="tab-pane fade" id="profile-calendar">
                        <p>calendar</p>
                    </div>
                    <div className="tab-pane fade" id="profile-photo">
                        <p>photo</p>
                    </div>
                    <div className="tab-pane fade" id="profile-settings">
                        <p>settings</p>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <MePanel 
        homeFeedActionMixinLoadProfileRequestFeed={true} />,
    document.getElementById('content')
);