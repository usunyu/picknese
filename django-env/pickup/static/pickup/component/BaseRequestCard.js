var BaseRequestCard = React.createClass({displayName: 'BaseRequestCard',
    mixins: [MessageActionMixin],
    handleRequestCancel: function() {
        this.props.onCancel(this.props.feed, this.props.mutateCallback);
    },
    handleContactMessageSubmit: function() {
        var feed = this.props.feed;
        var message = $("#" + this.getComponentID("textarea-feed-contact")).val().trim();
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact'));
        if (message == '') {
            submitButton.disabled = "disabled";
            return;
        }
        this.handleMessageSubmit({
            sender      : current_user.id,
            receiver    : feed.requester.id,
            message     : $("#" + this.getComponentID("textarea-feed-contact")).val().trim(),
        }, this.handleContactMessageCallback);
        $("#" + this.getComponentID("textarea-feed-contact")).val("");
    },
    handleContactMessageCallback: function() {
        $("#" + this.getActionButtonModalID("feed-contact")).modal('hide');
    },
    onContactMessageModalFocus: function() {
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact'));
        submitButton.disabled = "disabled";
    },
    onContactMessageInputChange: function() {
        var message = $("#" + this.getComponentID("textarea-feed-contact")).val().trim();
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact'));
        if (message == '') {
            submitButton.disabled = "disabled";
        } else {
            submitButton.disabled = "";
        }
    },
    getComponentID: function(prefix) {
        var feed = this.props.feed;
        return prefix + "-" + feed.id;
    },
    getActionButtonModalID: function(prefix) {
        if (jQuery.isEmptyObject(current_user)) {
            return "login-modal";
        } else {
            return this.getComponentID(prefix);
        }
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
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
            return (
                React.createElement("div", null, 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}}), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-success", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': "#" + this.getActionButtonModalID('feed-offer')}, 
                        React.createElement("i", {className: "glyphicon glyphicon-heart"}), " " + ' ' +
                        "Offer Help"
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-primary", 
                        style: {float: 'right', marginRight: '10px'}, 
                        'data-toggle': "modal", 
                        'data-target': "#" + this.getActionButtonModalID('feed-contact')}, 
                        React.createElement("i", {className: "glyphicon glyphicon-envelope"}), " " + ' ' +
                        "Contact"
                    ), 
                    /* Offer Button Modal */
                    React.createElement(InputConfirmationModal, {
                        feed: feed, 
                        id_prefix: "feed-offer", 
                        background_color: "background-color-success", 
                        title: "Offer Confirmation", 
                        placeholder: "Thanks for taking this request, anything you want to mention?", 
                        onSubmit: this.props.onSubmit, 
                        submit_text: "Confirm"}), 
                    /* Contact Button Modal */
                    React.createElement(InputConfirmationModal, {
                        feed: feed, 
                        id_prefix: "feed-contact", 
                        background_color: "background-color-primary", 
                        title: "Send Message", 
                        placeholder: "Anything you want to say?", 
                        onSubmit: this.handleContactMessageSubmit, 
                        submit_text: "Send", 
                        onInputChange: this.onContactMessageInputChange})
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
                    React.createElement("span", {className: "home-feed-title"}, layout.heading.user, " ", layout.heading.verb, " ", React.createElement("b", {style: {color: "#286090"}}, React.createElement("i", {className: layout.heading.icon}), layout.heading.action)), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "8px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD hh:mm A")), 
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