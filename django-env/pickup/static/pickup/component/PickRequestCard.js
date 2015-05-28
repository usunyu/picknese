var PickRequestCard = React.createClass({displayName: 'PickRequestCard',
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
                        'aria-labelledby': "modalLabel", 
                        'aria-hidden': "true"}, 
                        React.createElement("div", {className: "modal-dialog modal-sm"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header", style: {backgroundColor: "#ff9800"}}, 
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
        }
    },
    render: function() {
        var feed = this.props.feed;
        return (
            React.createElement("div", {className: "panel panel-primary clearfix fadein-effect"}, 
                React.createElement("h6", {
                    style: {marginLeft: '80px', marginRight: '4px', color: '#666666'}}, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("b", null, feed.requester.first_name, " ", feed.requester.last_name)
                    ), 
                    React.createElement("b", null, " is looking for ", React.createElement("span", {className: "label label-success", style: {fontSize: "95%"}}, "pick up")), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "15px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD HH:mm")), 
                        React.createElement("i", {className: "glyphicon glyphicon-tag", style: {marginRight: "10px"}})
                    )
                ), 
                React.createElement("hr", {style: {marginTop: '9px', marginBottom: '0px'}}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
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
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Start"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-tag"}), " ", feed.start
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Destination"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", feed.destination
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-5", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Pick Time"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment(feed.date_time).format("YYYY-MM-DD HH:mm")
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-5", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Pay"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", feed.price
                                    ), 
                                    feed.description ? 
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Message"}, 
                                        React.createElement("i", {className: feed.description ? "glyphicon glyphicon-comment" : ""}), " ", feed.description
                                    ) : null
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