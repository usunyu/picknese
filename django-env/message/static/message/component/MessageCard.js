var MessageCard = React.createClass({displayName: 'MessageCard',
    render: function() {
        var message = this.props.message;
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect message-card-div".concat(this.props.first ? " first" : "")}, 
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
                        React.createElement("div", {className: "media-body"}, 
                            React.createElement("b", null, message.message)
                        )
                    )
                ), 
                React.createElement("div", {id: "message-" + message.id, className: "panel-collapse collapse"}, 
                    "Hello World!"
                )
            )
        );
    }
});