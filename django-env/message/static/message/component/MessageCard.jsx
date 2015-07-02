var MessageCard = React.createClass({
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
                <div className="media">
                    <hr />
                    <div className="media-left">
                        <img
                            className="image-circular"
                            src={
                                reply.sender.profile.avatar ? 
                                reply.sender.profile.avatar : getProfileDefaultPic()
                            }
                            style={{width: '30px', height: '30px'}} />
                    </div>
                    <div className="media-body" style={{width: '100%'}}>
                        <div className="col-md-2">
                            {reply.sender.first_name} {reply.sender.last_name}
                        </div>
                        <div className="col-md-10">
                            {reply.message}
                        </div>
                    </div>
                    <div className="media-right">
                        
                    </div>
                </div>
            );
        }
        return (
            <div
                className={"panel clearfix fadein-effect message-card-div".concat(this.props.first ? " first" : "")}
                onClick={this.onMessageCardClick}>
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
                        <div className="media-body" style={{width: '100%'}}>
                            <div className="col-md-2">
                                {message.sender.first_name} {message.sender.last_name}
                            </div>
                            <div className="col-md-10">
                                {message.message}
                            </div>
                        </div>
                        <div className="media-right">
                            
                        </div>
                    </div>
                </div>
                <div id={"message-" + message.id} className="panel-collapse collapse">
                    <div className="panel-body">
                        {replyList}
                    </div>
                </div>
            </div>
        );
    }
});