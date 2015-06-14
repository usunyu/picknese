var BaseRequestCard = React.createClass({displayName: 'BaseRequestCard',
    handleRequestCancel: function() {
        this.props.onCancel(this.props.feed, this.props.cancelCallback);
    },
    getOfferActionButtonModalID: function() {
        if (jQuery.isEmptyObject(current_user)) {
            return "#login-modal";
        } else {
            var feed = this.props.feed;
            return "#feed-" + feed.id;
        }
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
            if (feed.confirmed) {
                return (null);
            }
            return (
                React.createElement("div", null, 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}}), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-warning", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': "#feed-" + feed.id}, 
                        React.createElement("i", {className: "glyphicon glyphicon-remove"}), " " + ' ' +
                        "Cancel"
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-primary", 
                        style: {float: 'right', marginRight: '10px'}, 
                        'data-toggle': "modal", 
                        'data-target': "#update-modal-" + feed.feed_type + "-" + feed.id}, 
                        React.createElement("i", {className: "glyphicon glyphicon-edit"}), " " + ' ' +
                        "Update"
                    ), 
                    /* Cancel Button Modal */
                    React.createElement(WarningConfirmationModal, {
                        feed: feed, 
                        title: "Cancel Confirmation", 
                        text: "Are you sure want to cancel this request?", 
                        onConfirm: this.handleRequestCancel}), 
                    /* Update Button Modal */
                    React.createElement("div", {
                        id: "update-modal-" + feed.feed_type + "-" + feed.id, 
                        className: "modal fade", 
                        tabIndex: "-1", 
                        role: "dialog", 
                        'aria-hidden': "true"}, 
                        React.createElement("div", {className: "modal-dialog modal-lg"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header", style: {backgroundColor: "#0084B4"}}, 
                                    React.createElement("button", {
                                        type: "button", 
                                        className: "close", 
                                        'data-dismiss': "modal", 
                                        'aria-label': "Close", 
                                        style: {color: "white"}}, 
                                        React.createElement("span", {'aria-hidden': "true"}, "×")
                                    ), 
                                    React.createElement("h5", {className: "modal-title", style: {color: "white"}}, 
                                        "Update Your Request"
                                    )
                                ), 
                                React.createElement("div", {className: "modal-body"}, 
                                    this.props.updateForm
                                )
                            )
                        )
                    )
                )
            );
        } else {
            if (feed.confirmed) {
                return (null);
            }
            return (
                React.createElement("div", null, 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}}), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-success", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': this.getOfferActionButtonModalID()}, 
                        React.createElement("i", {className: "glyphicon glyphicon-heart"}), " " + ' ' +
                        "Offer Help"
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-primary", 
                        style: {float: 'right', marginRight: '10px'}}, 
                        React.createElement("i", {className: "glyphicon glyphicon-edit"}), " " + ' ' +
                        "Comment"
                    ), 
                    /* Offer Button Modal */
                    React.createElement("div", {
                        id: "feed-" + feed.id, 
                        className: "modal fade", 
                        tabIndex: "-1", 
                        role: "dialog", 
                        'aria-hidden': "true"}, 
                        React.createElement("div", {className: "modal-dialog"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header", style: {backgroundColor: "#4caf50"}}, 
                                    React.createElement("button", {
                                        type: "button", 
                                        className: "close", 
                                        'data-dismiss': "modal", 
                                        'aria-label': "Close", 
                                        style: {color: "white"}}, 
                                        React.createElement("span", {'aria-hidden': "true"}, "×")
                                    ), 
                                    React.createElement("h5", {className: "modal-title", style: {color: "white"}}, 
                                        "Offer Confirmation"
                                    )
                                ), 
                                React.createElement("div", {className: "modal-body"}, 
                                    React.createElement("div", {className: "form-group"}, 
                                        React.createElement("textarea", {
                                            id: "pick-up-desc-textarea", 
                                            className: "form-control", 
                                            rows: "3", 
                                            placeholder: "Thanks for taking this request, anything you want to mention?"}
                                        )
                                    )
                                ), 
                                React.createElement("div", {className: "modal-footer"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Cancel"), 
                                    React.createElement("button", {
                                        type: "button", 
                                        className: "btn btn-primary", 
                                        onClick: this.props.onSubmit}, 
                                        "Confirm"
                                    )
                                )
                            )
                        )
                    )
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
                                feed.requester.profile.avatar ? 
                                feed.requester.profile.avatar : getProfileDefaultPic(), 
                            
                            style: {width: '40px', height: '40px'}})
                    ), 
                    React.createElement("b", {className: "home-feed-title"}, layout.heading.user, " ", layout.heading.verb, " ", React.createElement("span", {className: "label label-danger", style: {fontSize: "95%"}}, layout.heading.action)), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "8px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD hh:mm A")), 
                        React.createElement("i", {className: layout.heading.icon, style: {marginRight: "15px", marginTop: "3px"}}), 
                        React.createElement("a", {href: getHomeFeedURL(feed.university.id)}, 
                            React.createElement("img", {
                                className: "image-circular", 
                                src: getUniversityLogo(feed.university.shorthand), 
                                style: {width: '25px', height: '25px'}})
                        )
                    )
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#", className: "home-feed-md-profile"}, 
                                React.createElement("img", {
                                    className: "image-circular", 
                                    src: 
                                        feed.requester.profile.avatar ? 
                                        feed.requester.profile.avatar : getProfileDefaultPic(), 
                                    
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
                    this.getActionButton()
                )
            )
        );
    }
});