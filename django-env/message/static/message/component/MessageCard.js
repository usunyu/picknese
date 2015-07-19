var MessageCard = React.createClass({displayName: 'MessageCard',
    mixins: [MessageActionMixin],
    onMessageCardClick: function(event) {
        var message = this.props.message;
        if (!this.state.replies_requested) {
            this.setState({replies_requested: true});
            this.loadMessageReplyListFromServer(message.id);
        }
        // remove bold for unread message
        $('#message-card-' + message.id).removeClass('font-bold');
        // send request to update read state
        if (message.unread && !this.state.replies_requested) {
            this.handleReadMssageSubmit(message);
        }
    },
    handleMessageReplyCallback: function() {
        var message = this.props.message;
        this.loadMessageReplyListFromServer(message.id);
    },
    onMessageReplyClick: function(event) {
        var message = this.props.message;
        var data = {
            message_target  : message.id,
            message         : $("#message-reply-" + message.id).val(),
            sender          : current_user.id,
            receiver        : message.sender.id,
        };
        $("#message-reply-" + message.id).val('');
        this.handleMessageReplySubmit(data, this.handleMessageReplyCallback);
    },
    componentDidMount: function() {
        var message = this.props.message;
        $("#message-reply-" + message.id).keyup(function(event){
            if(event.keyCode == 13){
                $("#message-send-" + message.id).click();
            }
        });
    },
    render: function() {
        var message = this.props.message;
        var replyList = [];
        for (var i = 0; i < this.state.replies.length; i++) {
            var reply = this.state.replies[i];
            media_left =
                React.createElement("img", {
                    className: "image-circular", 
                    src: 
                        reply.sender.profile.avatar ? 
                        reply.sender.profile.avatar : getProfileDefaultPic(), 
                    
                    style: {width: '30px', height: '30px'}});
            replyList.push(
                React.createElement("div", {className: "media", key: i}, 
                    React.createElement("div", {className: "media-left"}, 
                        media_left
                    ), 
                    React.createElement("div", {className: "media-body", style: {width: '80%'}}, 
                        React.createElement("div", {className: "col-md-2"}, 
                            reply.sender.first_name
                        ), 
                        React.createElement("div", {className: "col-md-10"}, 
                            reply.message
                        )
                    ), 
                    React.createElement("div", {className: "media-right", style: {fontSize: '70%'}}, 
                        moment(reply.created).format("YYYY-MM-DD hh:mm A")
                    )
                )
            );
        }
        var css_class = "panel clearfix fadein-effect message-card-div";
        if (this.props.first) {
            css_class = css_class.concat(" first");
        }
        if (message.unread) {
            css_class = css_class.concat(" font-bold");
        }
        return (
            React.createElement("div", {id: "message-card-" + message.id, className: css_class}, 
                React.createElement("div", {
                    className: "panel-body", 
                    'data-toggle': "collapse", 
                    'data-target': "#message-" + message.id}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("img", {
                                className: "image-circular", 
                                src: 
                                    message.sender.profile.avatar ? 
                                    message.sender.profile.avatar : getProfileDefaultPic(), 
                                
                                style: {width: '30px', height: '30px'}})
                        ), 
                        React.createElement("div", {
                            className: "media-body", 
                            style: {width: '80%'}, 
                            onClick: this.onMessageCardClick}, 
                            React.createElement("div", {className: "col-md-2"}, 
                                message.sender.first_name
                            ), 
                            React.createElement("div", {className: "col-md-10"}, 
                                message.message
                            )
                        ), 
                        React.createElement("div", {className: "media-right", style: {fontSize: '70%'}}, 
                            moment(message.created).format("YYYY-MM-DD hh:mm A")
                        )
                    )
                ), 
                React.createElement("div", {id: "message-" + message.id, className: "panel-collapse collapse"}, 
                    React.createElement("hr", {style: {marginTop: "0px"}}), 
                    React.createElement("div", {className: "panel-body no-top-padding"}, 
                        replyList
                    ), 
                    React.createElement("div", {className: "panel-footer"}, 
                        React.createElement("div", null, 
                            React.createElement("div", {className: "input-group"}, 
                                React.createElement("input", {
                                    id: "message-reply-" + message.id, 
                                    type: "text", 
                                    className: "form-control", 
                                    placeholder: "Reply the message..."}), 
                                React.createElement("span", {className: "input-group-btn"}, 
                                    React.createElement("button", {
                                        id: "message-send-" + message.id, 
                                        className: "btn btn-primary", 
                                        onClick: this.onMessageReplyClick, 
                                        type: "button"}, 
                                        "Send"
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});