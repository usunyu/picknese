
var MePanel = React.createClass({displayName: 'MePanel',
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
            React.createElement("div", null, 
                React.createElement("ul", {className: "nav nav-tabs nav-justified"}, 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-inbox", onClick: this.onProfileInboxClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-envelope"}), "  Inbox  ", React.createElement("span", {className: "badge"}, "7")
                        )
                    ), 
                    React.createElement("li", {className: "active"}, 
                        React.createElement("a", {href: "#profile-request", onClick: this.onProfileRequestClick, 'data-toggle': "tab", 'aria-expanded': "true"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-list-alt"}), "  Your Requests  ", React.createElement("span", {className: "badge"}, "2")
                        )
                    ), 
                    React.createElement("li", null, 
                        React.createElement("a", {href: "#profile-offer", onClick: this.onProfileOfferClick, 'data-toggle': "tab", 'aria-expanded': "false"}, 
                            React.createElement("span", {className: "glyphicon glyphicon-heart"}), "  Your Offers  ", React.createElement("span", {className: "badge"}, "3")
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

                React.createElement("div", {id: "profile-tab-content", className: "tab-content"}, 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-inbox"}, 
                        React.createElement("p", null, "inbox")
                    ), 
                    React.createElement("div", {className: "tab-pane fade active in", id: "profile-request"}, 
                        React.createElement("p", null, "request")
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-offer"}, 
                        React.createElement("p", null, "offer")
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-calendar"}, 
                        React.createElement("p", null, "calendar")
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-photo"}, 
                        React.createElement("p", null, "photo")
                    ), 
                    React.createElement("div", {className: "tab-pane fade", id: "profile-settings"}, 
                        React.createElement("p", null, "settings")
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(MePanel, null),
    document.getElementById('content')
);