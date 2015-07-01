var MessageCard = React.createClass({
    mixins: [MessageActionMixin],
    onMessageCardClick: function(event) {
        if (!this.state.replies_requested) {
            this.setState({replies_requested: true});
            
        }
    },
    render: function() {
        var message = this.props.message;
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
                    TODO
                </div>
            </div>
        );
    }
});