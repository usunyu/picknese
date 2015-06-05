var BaseRequestCard = React.createClass({displayName: 'BaseRequestCard',
    componentDidUpdate: function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    handleRequestCancel: function() {
        var feed = this.props.feed;
        this.props.onCancel(feed);
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
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
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-primary", 
                        style: {float: 'right', marginRight: '10px'}}, 
                        React.createElement("i", {className: "glyphicon glyphicon-edit"}), " " + ' ' +
                        "Update"
                    ), 
                    /* Cancel Button Modal */
                    React.createElement("div", {
                        id: "feed-" + feed.id, 
                        className: "modal fade", 
                        tabIndex: "-1", 
                        role: "dialog", 
                        'aria-hidden': "true"}, 
                        React.createElement("div", {className: "modal-dialog modal-sm"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header background-color-warning"}, 
                                    React.createElement("button", {
                                        type: "button", 
                                        className: "close", 
                                        'data-dismiss': "modal", 
                                        'aria-label': "Close", 
                                        style: {color: "white"}}, 
                                        React.createElement("span", {'aria-hidden': "true"}, "×")
                                    ), 
                                    React.createElement("h5", {className: "modal-title", style: {color: "white"}}, 
                                        "Cancel Confirmation"
                                    )
                                ), 
                                React.createElement("div", {className: "modal-body"}, 
                                    React.createElement("p", null, "Are you sure want to cancel this request?")
                                ), 
                                React.createElement("div", {className: "modal-footer"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-default", 'data-dismiss': "modal"}, "Cancel"), 
                                    React.createElement("button", {
                                        type: "button", 
                                        className: "btn btn-primary", 
                                        onClick: this.handleRequestCancel}, 
                                        "Confirm"
                                    )
                                )
                            )
                        )
                    )
                )
            );
        } else {
            return (
                React.createElement("div", null, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-success", 
                        style: {float: 'right'}, 
                        'data-toggle': "modal", 
                        'data-target': "#feed-" + feed.id}, 
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
    getContentBody: function() {
        var layout = this.props.layout;
        var content = [];
        for (var key in layout.body) {
            var value = layout.body[key];
            content.push(
                React.createElement("p", {
                    key: key, 
                    className: layout.body[key].class, 
                    'data-toggle': "tooltip", 
                    'data-placement': "left", 
                    title: layout.body[key].title}, 
                    React.createElement("i", {className: layout.body[key].icon}), " ", layout.body[key].content
                )
            );
        }
        return content;
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
                    React.createElement("b", {className: "home-feed-title"}, feed.requester.first_name, " ", feed.requester.last_name, " ", layout.heading.verb, " ", React.createElement("span", {className: "label label-danger", style: {fontSize: "95%"}}, layout.heading.action)), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "15px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD HH:mm")), 
                        React.createElement("i", {className: layout.heading.icon, style: {marginRight: "10px"}})
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
                                React.createElement("div", null, 
                                    this.getContentBody()
                                )
                            )
                        )
                    ), 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}}), 
                    this.getActionButton()
                )
            )
        );
    }
});