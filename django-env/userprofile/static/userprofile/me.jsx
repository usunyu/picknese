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

var CURRENT_PANEL = INBOX_PANEL;

var FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH = false;
var FIRST_LOAD_PROFILE_OFFER_FEED_FINISH = false;

var PROFILE_FIRST_NAME_INPUT    = "profile-first-name-input";
var PROFILE_LAST_NAME_INPUT     = "profile-last-name-input";
var PROFILE_UNIVERSITY_SELECT   = "profile-univsersity-select";
var PROFILE_GENDER_SELECT       = "profile-gender-select";
var PROFILE_BIRTHDAY_INPUT      = "profile-birthday-input";
var PROFILE_INTRO_TEXTAREA      = "profile-intro-textarea";
var PROFILE_PHONE_INPUT         = "profile-phone-input";
var PROFILE_QQ_INPUT            = "profile-qq-input";
var PROFILE_WECHAT_INPUT        = "profile-wechat-input";

var PROFILE_UPDATE_BUTTON = "profile-update-button";

var MePanel = React.createClass({
    mixins: [FeedActionMixin,
             ProfileActionMixin,
             MessageActionMixin,
             UniversityActionMixin],
    componentWillMount: function() {
        // set for PostRequestInput
        CURRENT_PAGE = UPDATE_REQUEST_PAGE;
    },
    componentDidMount: function() {
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();

        $('.selectpicker').on('change', function(){
            // Hack
            var submitButton = document.getElementById(PROFILE_UPDATE_BUTTON);
            submitButton.disabled = "";
        });

        // enable inbox message accordion
        $('#message-accordion').on('show.bs.collapse', function () {
            $('#message-accordion .in')
                .parent()
                .animate({
                    marginTop: '0px',
                    marginBottom: '0px',
                }, "fast");
            $('#message-accordion .in').collapse('hide');
        });
        $('#message-accordion').on('hide.bs.collapse', function () {
            $('#message-accordion .in')
                .parent()
                .animate({
                    marginTop: '0px',
                    marginBottom: '0px',
                }, "fast");
        });
        $('#message-accordion').on('shown.bs.collapse', function () {
            var first = $('#message-accordion .in').parent().hasClass('first');
            var marginTop = first ? '0px' : '15px';
            $('#message-accordion .in')
                .parent()
                .animate({
                    marginTop: marginTop,
                    marginBottom: '15px',
                }, "fast");
        });
    },
    onProfileInboxClick: function(event) {
        if (CURRENT_PANEL == INBOX_PANEL) {return;}
        CURRENT_PANEL = INBOX_PANEL;
        this.loadMessageListFromServer();
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
        var universities = [];
        var selected = [];
        for (var i = 0; i < this.state.universitySimpleList.length; i++) {
            var data = this.state.universitySimpleList[i];
            var u = {
                id: data.id,
                title: data.name,
                search: data.shorthand + data.name,
            };
            universities.push(u);
        }
        // Check if user already set up university
        if (current_user.university_id) {
            selected = [current_user.university_id];
        }
        $("#" + PROFILE_UNIVERSITY_SELECT).selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false,
            onBlur: function() {
                // Hack! Selectize not work well with Bootstrap
                var new_value = $("#" + PROFILE_UNIVERSITY_SELECT).val().trim();
                if (new_value !== current_user.university_id) {
                    var submitButton = document.getElementById(PROFILE_UPDATE_BUTTON);
                    submitButton.disabled = "";
                }
            },
        });

        $('#profile-birthday-input-div').datetimepicker({
            format: 'MM/DD/YYYY',
            // defaultDate: new Date(1990, 0, 1, 0, 0, 0, 0),
            useCurrent: false,
        });

        $("#" + PROFILE_GENDER_SELECT).val(current_user.gender);
        $('.selectpicker').selectpicker('refresh');
    },
    getProfileInboxList: function() {
        var messageList = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            messageList.push(
                <MessageCard
                    key={i}
                    message={this.state.messages[i]}
                    first={i == 0}
                    onReply={null} />
            );
        }
        return (
            <div className="col-sm-12 home-feed-card-div">
                <div className="feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12">
                    {this.getMessageTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div" id="message-accordion">
                    {messageList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getMessageTypeSelect()}
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
                            onUpdate={this.handlePickRequestUpdate}
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
        if (profileFeedList.length == 0) {
            if (FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH) {
                // add a dummy post if we have no feed
                profileFeedList.push(<PusheenHappyCard key={0} />);
            } else {
                // add a loading panel if we havn't finish the request
                profileFeedList.push(<LoadingCard key={0} />);
            }
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
        if (profileFeedList.length == 0) {
            if (FIRST_LOAD_PROFILE_OFFER_FEED_FINISH) {
                // add a dummy post if we have no feed
                profileFeedList.push(<PusheenLazyCard key={0} />);
            } else {
                // add a loading panel if we havn't finish the request
                profileFeedList.push(<LoadingCard key={0} />);
            }
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
    onMessageTypeChange: function(event) {
        CURRENT_MESSAGE_TYPE = event.target.value;
        this.loadMessageListFromServer();
    },
    getMessageTypeSelect: function() {
        return (
            <select
                className="selectpicker"
                data-style="btn-primary"
                onChange={this.onMessageTypeChange}>
                <option
                    data-icon="icon-mail-alt"
                    key={RECEIVED_MESSAGE}
                    value={RECEIVED_MESSAGE}>
                    Received
                </option>
                <option
                    data-icon="icon-paper-plane"
                    key={SENT_MESSAGE}
                    value={SENT_MESSAGE}>
                    Sent
                </option>
            </select>
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
    handleProfileUpdate: function() {
        event.preventDefault();
        // $("#" + PROFILE_UPDATE_BUTTON).button('loading');
        var submitButton = document.getElementById(PROFILE_UPDATE_BUTTON);
        submitButton.disabled = "disabled";

        var update_data = {
            first_name   : $("#" + PROFILE_FIRST_NAME_INPUT).val().trim(),
            last_name    : $("#" + PROFILE_LAST_NAME_INPUT).val().trim(),
            university   : $("#" + PROFILE_UNIVERSITY_SELECT).val().trim(),
            gender       : $("#" + PROFILE_GENDER_SELECT).val().trim(),
            birthday     : moment(new Date($("#" + PROFILE_BIRTHDAY_INPUT).val().trim())).format("YYYY-MM-DD"),
            introduction : $("#" + PROFILE_INTRO_TEXTAREA).val().trim(),
            phone        : $("#" + PROFILE_PHONE_INPUT).val().trim(),
            qq           : $("#" + PROFILE_QQ_INPUT).val().trim(),
            wechat       : $("#" + PROFILE_WECHAT_INPUT).val().trim(),
        };

        this.handleProfileInfoUpdate(update_data);
    },
    onRequiredInputFocusLose: function(id, value) {
        // Check input error
        var element = $('#' + id);
        var new_value = element.val().trim();
        var inputError = new_value == "";
        if (inputError) {
            element.parent().addClass("has-error");
        } else {
            element.parent().removeClass("has-error");
        }

        var submitButton = document.getElementById(PROFILE_UPDATE_BUTTON);
        if (inputError) {
            submitButton.disabled = "disabled";
        } else {
            this.onInputFocusLose(id, value);
        }
    },
    onInputFocusLose: function(id, value) {
        var new_value = $('#' + id).val().trim();
        if (id === PROFILE_BIRTHDAY_INPUT) {
            value = moment(new Date(current_user.birthday)).format('MM/DD/YYYY');
        }
        if (value !== new_value) {
            var submitButton = document.getElementById(PROFILE_UPDATE_BUTTON);
            submitButton.disabled = "";
        }
    },
    getProfileSettings: function() {
        return (
            <div className="col-sm-12">
                <form className="form-horizontal" onSubmit={this.handleProfileUpdate}>
                    <h5 className="text-center">Basic Infomation</h5>
                    <hr />
                    <div className="form-group">
                        <label className="col-sm-2 control-label">First Name</label>
                        <div className="col-sm-4">
                            <input
                                id={PROFILE_FIRST_NAME_INPUT}
                                type="text"
                                defaultValue={current_user.first_name}
                                onBlur={this.onRequiredInputFocusLose.bind(this, PROFILE_FIRST_NAME_INPUT, current_user.first_name)}
                                className="form-control" />
                        </div>
                        <label className="col-sm-2 control-label">Last Name</label>
                        <div className="col-sm-4">
                            <input
                                id={PROFILE_LAST_NAME_INPUT}
                                type="text"
                                defaultValue={current_user.last_name}
                                onBlur={this.onRequiredInputFocusLose.bind(this, PROFILE_LAST_NAME_INPUT, current_user.last_name)}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">University</label>
                        <div className="col-sm-10">
                            <select
                                id={PROFILE_UNIVERSITY_SELECT}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Birthday</label>
                        <div className="col-sm-4">
                            <div className='input-group date' id='profile-birthday-input-div'>
                                <input
                                    id={PROFILE_BIRTHDAY_INPUT}
                                    type='text'
                                    defaultValue={moment(new Date(current_user.birthday)).format('MM/DD/YYYY')}
                                    onBlur={this.onInputFocusLose.bind(this, PROFILE_BIRTHDAY_INPUT, current_user.birthday)}
                                    className="form-control" />
                                <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <label className="col-sm-2 control-label">Gender</label>
                        <div className="col-sm-4">
                            <select
                                id={PROFILE_GENDER_SELECT}
                                className="selectpicker"
                                data-style="btn-default"
                                style={{display: "none"}}>
                                <option ></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Introduction</label>
                        <div className="col-sm-10">
                            <textarea
                                id={PROFILE_INTRO_TEXTAREA}
                                className="form-control"
                                rows="3"
                                defaultValue={current_user.introduction}
                                onBlur={this.onInputFocusLose.bind(this, PROFILE_INTRO_TEXTAREA, current_user.introduction)}
                                placeholder="Tell about yourself, let others know you better :)">
                            </textarea>
                        </div>
                    </div>
                    <hr />
                    <h5 className="text-center">Contact Infomation</h5>
                    <p className="text-center" style={{color: "#e51c23"}}>(your contact infomation will not be public)</p>
                    <hr />
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Phone</label>
                        <div className="col-sm-4">
                            <div className="input-group">
                                <input 
                                    id={PROFILE_PHONE_INPUT}
                                    type="text"
                                    defaultValue={current_user.phone}
                                    onBlur={this.onInputFocusLose.bind(this, PROFILE_PHONE_INPUT, current_user.phone)}
                                    className="form-control" />
                                <span className="input-group-btn">
                                    <button className="btn btn-success" type="button">Verify</button>
                                </span>
                            </div>
                        </div>
                        <label className="col-sm-2 control-label">QQ</label>
                        <div className="col-sm-4">
                            <input
                                id={PROFILE_QQ_INPUT}
                                type="text"
                                defaultValue={current_user.qq}
                                onBlur={this.onInputFocusLose.bind(this, PROFILE_QQ_INPUT, current_user.qq)}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Wechat</label>
                        <div className="col-sm-4">
                            <input
                                id={PROFILE_WECHAT_INPUT}
                                type="text"
                                defaultValue={current_user.wechat}
                                onBlur={this.onInputFocusLose.bind(this, PROFILE_WECHAT_INPUT, current_user.wechat)}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button
                                id={PROFILE_UPDATE_BUTTON}
                                type="submit"
                                disabled="disabled"
                                className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    },
    getUnreadMessageCount: function() {
        var unread_count = 0;
        // TODO: using unread table
        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            if (message.unread) { unread_count++; }
        }
        return unread_count;
    },
    render: function() {
        return (
            <div>
                <ul className="nav nav-tabs nav-justified">
                    <li className="active">
                        <a href="#profile-inbox" onClick={this.onProfileInboxClick} data-toggle="tab" aria-expanded="true">
                            <span className="glyphicon glyphicon-envelope"></span>&nbsp; Inbox &nbsp;
                            <span className="badge">{this.getUnreadMessageCount()}</span>
                        </a>
                    </li>
                    <li>
                        <a href="#profile-request" onClick={this.onProfileRequestClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-list-alt"></span>&nbsp; Your Requests
                        </a>
                    </li>
                    <li>
                        <a href="#profile-offer" onClick={this.onProfileOfferClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-heart"></span>&nbsp; Your Offers
                        </a>
                    </li>
                    {/*
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
                    */}
                    <li>
                        <a href="#profile-settings" onClick={this.onProfileSettingsClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-cog"></span>&nbsp; Profile Settings
                        </a>
                    </li>
                </ul>

                <div id="profile-tab-content" className="tab-content" style={{marginTop: "15px"}}>
                    <div className="tab-pane fade active in" id="profile-inbox">
                        {this.getProfileInboxList()}
                    </div>
                    <div className="tab-pane fade" id="profile-request">
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
        messageActionMixinLoadMessageList={true}
        universityActionMinxinLoadSimpleList={true} />,
    document.getElementById('content')
);