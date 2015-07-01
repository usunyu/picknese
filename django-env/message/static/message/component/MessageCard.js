var MessageCard = React.createClass({displayName: 'MessageCard',
    mixins: [MessageActionMixin],
    onMessageCardClick: function(event) {
        if (!this.state.replies_requested) {
            this.setState({replies_requested: true});
            
        }
    },
    render: function() {
        var message = this.props.message;
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
                        React.createElement("div", {className: "media-body", style: {width: '100%'}}, 
                            React.createElement("div", {className: "col-md-2"}, 
                                message.sender.first_name, " ", message.sender.last_name
                            ), 
                            React.createElement("div", {className: "col-md-10"}, 
                                message.message
                            )
                        ), 
                        React.createElement("div", {className: "media-right"}
                            
                        )
                    )
                ), 
                React.createElement("div", {id: "message-" + message.id, className: "panel-collapse collapse"}, 
                    "TODO"
                )
            )
        );
    }
});