var MessageCard = React.createClass({
    render: function() {
        var message = this.props.message;
        return (
            <div className={"panel clearfix fadein-effect message-card-div".concat(this.props.first ? " first" : "")}>
                <div
                    className="panel-body"
                    data-toggle="collapse" 
                    data-target={"#message-" + message.id}>
                    <div className="media">
                        <div className="media-left">
                            <img
                                className="image-circular"
                                src={
                                    message.sender.profile.avatar ? 
                                    message.sender.profile.avatar : getProfileDefaultPic()
                                }
                                style={{width: '30px', height: '30px'}} />
                        </div>
                        <div className="media-body">
                            <b>{message.message}</b>
                        </div>
                    </div>
                </div>
                <div id={"message-" + message.id} className="panel-collapse collapse">
                    Hello World!
                </div>
            </div>
        );
    }
});