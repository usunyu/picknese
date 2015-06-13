var BasePickUpCard = React.createClass({displayName: 'BasePickUpCard',
    handlePickUpReject: function() {
        this.props.onReject(this.props.feed, this.props.rejectCallback);
    },
    handlePickUpCancel: function() {
        this.props.onCancel(this.props.feed, this.props.cancelCallback);
    },
    getSubCard: function() {
        var feed = this.props.feed;
        var layout = this.props.layout;
        switch(layout.body.sub_type) {
            case PICK_REQUEST:
                return (
                    React.createElement(PickRequestCard, {
                        feed: feed.pick_request})
                );
            case FLIGHT_PICK_REQUEST:
                return (
                    React.createElement(FlightPickRequestCard, {
                        feed: feed.flight_pick_request})
                );
        }
        return (
            React.createElement("div", null)
        );
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own offer */}
        if (current_user.id == feed.picker.id) {
            return (
                React.createElement("div", null, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-warning", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': "#feed-" + feed.id}, 
                        React.createElement("i", {className: "glyphicon glyphicon-remove"}), " " + ' ' +
                        "Cancel"
                    ), 
                    /* Cancel Button Modal */
                    React.createElement(WarningConfirmationModal, {
                        feed: feed, 
                        title: "Cancel Confirmation", 
                        text: "Are you sure want to cancel this offer?", 
                        onConfirm: this.handlePickUpCancel})
                )
            );
        } else {
            return (
                React.createElement("div", null, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-danger", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': "#feed-" + feed.id}, 
                        React.createElement("i", {className: "glyphicon glyphicon-remove"}), " " + ' ' +
                        "Reject"
                    ), 
                    /* Reject Button Modal */
                    React.createElement(WarningConfirmationModal, {
                        feed: feed, 
                        title: "Reject Confirmation", 
                        text: "Are you sure want to reject this offer?", 
                        onConfirm: this.handlePickUpReject})
                )
            );
        }
    },
    render: function() {
        var feed = this.props.feed;
        var layout = this.props.layout;
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("a", {href: "#", className: "home-feed-sm-profile"}, 
                        React.createElement("img", {
                            className: "image-circular", 
                            src: 
                                feed.picker.profile.avatar ? 
                                feed.picker.profile.avatar : getProfileDefaultPic(), 
                            
                            style: {width: '40px', height: '40px'}})
                    ), 
                    React.createElement("b", {className: "home-feed-title"}, layout.heading.user, " ", layout.heading.verb, " ", React.createElement("span", {className: "label label-success", style: {fontSize: "95%"}}, layout.heading.action)), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "8px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD HH:mm")), 
                        React.createElement("i", {className: layout.heading.icon, style: {marginTop: "3px"}})
                    )
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {paddingBottom: "0px"}}, 
                    React.createElement("div", {className: "media-left"}, 
                        React.createElement("a", {href: "#", className: "home-feed-md-profile"}, 
                            React.createElement("img", {
                                className: "image-circular", 
                                src: 
                                    feed.picker.profile.avatar ? 
                                    feed.picker.profile.avatar : getProfileDefaultPic(), 
                                
                                style: {width: '60px', height: '60px', marginTop: '-60px', marginLeft: '-7px'}})
                        )
                    ), 
                    React.createElement("div", {className: "media-body"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement(BaseContentBody, {
                                layout: layout})
                        )
                    )
                ), 

                this.getSubCard(), 
                
                React.createElement("div", {className: "panel-body home-feed-panel-body-nested-div"}, 
                    this.getActionButton()
                )
            )
        );
    }
});