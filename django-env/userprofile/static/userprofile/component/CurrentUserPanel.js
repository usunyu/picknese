// Parameters: currentUser, university, onPickRequesterSubmit
var CurrentUserPanel = React.createClass({displayName: "CurrentUserPanel",
    render: function() {
        if (!this.props.university || !this.props.currentUser) {
            return (
                React.createElement("div", {className: "panel panel-default"})
            );
        }
        if (!this.props.currentUser.id) {
            return (
                React.createElement("div", {className: "panel panel-default"}, 
                    React.createElement("div", {className: "panel-body"}, 
                        React.createElement("hr", null), 
                        React.createElement("p", null, "Hi, please login to join us :)")
                    ), 
                    React.createElement("hr", null)
                )
            );
        }
        var currentUser = this.props.currentUser;
        var avatar = currentUser.profile.avatar;
        return (
            React.createElement("div", {className: "panel panel-primary clearfix"}, 
                React.createElement("div", {className: "panel-heading", style: {minHeight: '80px'}}), 
                React.createElement("div", {className: "panel-body", style: {marginTop: '-70px'}}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-sm-6 col-md-6"}, 
                            React.createElement("img", {
                                className: "image-thumbnail", 
                                src: avatar ? avatar : getProfileDefaultPic(), 
                                style: {width: '100px', height: '100px'}})
                        ), 
                        React.createElement("div", {className: "col-xs-6 col-sm-6 col-md-6", style: {marginTop: '25px'}}, 
                            React.createElement("p", {className: "color-white"}, 
                                React.createElement("b", null, currentUser.first_name, " ", currentUser.last_name)
                            ), 
                            React.createElement("p", null, 
                                React.createElement("a", {href: "/accounts/profile/"}, "Edit Profile")
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "list-group"}, 
                    React.createElement("a", {href: getMyPickupURL(this.props.university.id), 
                       className: "list-group-item " + checkActiveTab(getMyPickupBaseURL())}, 
                        React.createElement("span", {className: "badge"}, this.props.currentUserPickCount), 
                        React.createElement("img", {src: getGlyphiconsAirplaneIcon(), style: {width: '15px'}}), "   My Pick Up List"
                    ), 
                    React.createElement("a", {href: "#", 
                       className: "list-group-item"}, 
                        React.createElement("img", {src: getGlyphiconsCarIcon(), style: {width: '15px'}}), "   My Carpool List"
                    )
                )
            )
        );
    }
});