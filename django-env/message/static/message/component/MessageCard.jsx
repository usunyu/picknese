var MessageCard = React.createClass({
    render: function() {
        var message = this.props.message;
        return (
            <div className="panel clearfix fadein-effect no-bottom-margin">
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img
                                    className="image-circular"
                                    src={
                                        message.sender.profile.avatar ? 
                                        message.sender.profile.avatar : getProfileDefaultPic()
                                    }
                                    style={{width: '30px', height: '30px'}} />
                            </a>
                        </div>
                        <div className="media-body">
                            <b>{message.message}</b>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});