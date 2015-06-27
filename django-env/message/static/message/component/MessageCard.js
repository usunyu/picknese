var MessageCard = React.createClass({displayName: 'MessageCard',
    render: function() {
        var message = this.props.message;
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect no-bottom-margin"}, 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {
                                    className: "image-circular", 
                                    src: 
                                        message.sender.profile.avatar ? 
                                        message.sender.profile.avatar : getProfileDefaultPic(), 
                                    
                                    style: {width: '30px', height: '30px'}})
                            )
                        ), 
                        React.createElement("div", {className: "media-body"}, 
                            React.createElement("b", null, message.message)
                        )
                    )
                )
            )
        );
    }
});