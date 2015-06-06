
var MePanel = React.createClass({
    onProfileInboxClick: function(event) {
        console.log('onProfileInboxClick');
    },
    onProfileRequestClick: function(event) {
        console.log('onProfileRequestClick');
    },
    onProfileOfferClick: function(event) {
        console.log('onProfileOfferClick');
    },
    onProfileCalendarClick: function(event) {
        console.log('onProfileCalendarClick');
    },
    onProfilePictureClick: function(event) {
        console.log('onProfilePictureClick');
    },
    onProfileSettingsClick: function(event) {
        console.log('onProfileSettingsClick');
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
                            <span className="glyphicon glyphicon-list-alt"></span>&nbsp; Your Requests &nbsp;<span className="badge">2</span>
                        </a>
                    </li>
                    <li>
                        <a href="#profile-offer" onClick={this.onProfileOfferClick} data-toggle="tab" aria-expanded="false">
                            <span className="glyphicon glyphicon-heart"></span>&nbsp; Your Offers &nbsp;<span className="badge">3</span>
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

                <div id="profile-tab-content" className="tab-content">
                    <div className="tab-pane fade" id="profile-inbox">
                        <p>inbox</p>
                    </div>
                    <div className="tab-pane fade active in" id="profile-request">
                        <p>request</p>
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
    <MePanel/>,
    document.getElementById('content')
);