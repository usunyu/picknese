var MessageCard = React.createClass({displayName: 'MessageCard',
    mixins: [MessageActionMixin],
    onMessageCardClick: function(event) {
        var message = this.props.message;
        if (!this.state.replies_requested) {
            this.setState({replies_requested: true});
            this.loadMessageReplyListFromServer(message.id);
        }
    },
    render: function() {
        var message = this.props.message;
        var replyList = [];
        for (var i = 0; i < this.state.replies.length; i++) {
            var reply = this.state.replies[i];
            replyList.push(
                React.createElement("div", {className: "media", 
                     key: i}, 
                    React.createElement("hr", null), 
                    React.createElement("div", {className: "media-left"}, 
                        React.createElement("img", {
                            className: "image-circular", 
                            src: 
                                reply.sender.profile.avatar ? 
                                reply.sender.profile.avatar : getProfileDefaultPic(), 
                            
                            style: {width: '30px', height: '30px'}})
                    ), 
                    React.createElement("div", {className: "media-body", style: {width: '80%'}}, 
                        React.createElement("div", {className: "col-md-2"}, 
                            reply.sender.first_name, " ", reply.sender.last_name
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
        return (
            React.createElement("div", {
                className: "panel clearfix fadein-effect message-card-div".concat(this.props.first ? " first" : ""), 
                onClick: this.onMessageCardClick}, 
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
                        React.createElement("div", {className: "media-body", style: {width: '80%'}}, 
                            React.createElement("div", {className: "col-md-3"}, 
                                message.sender.first_name, " ", message.sender.last_name
                            ), 
                            React.createElement("div", {className: "col-md-9"}, 
                                message.message
                            )
                        ), 
                        React.createElement("div", {className: "media-right", style: {fontSize: '70%'}}, 
                            moment(message.created).format("YYYY-MM-DD hh:mm A")
                        )
                    )
                ), 
                React.createElement("div", {id: "message-" + message.id, className: "panel-collapse collapse"}, 
                    React.createElement("div", {className: "panel-body no-top-padding"}, 
                        replyList
                    )
                )
            )
        );
    }
});