var MessageCard = React.createClass({
    render: function() {
        var feed = this.props.feed;
        var layout = this.props.layout;
        return (
            <div className="panel clearfix fadein-effect home-feed-panel-div">
                <div className="panel-heading" style={{overflow: "auto"}}>
                    <a href="#" className="home-feed-sm-profile">
                        <img
                            className="image-circular"
                            src={
                                feed.requester.profile.avatar ? 
                                feed.requester.profile.avatar : getProfileDefaultPic()
                            }
                            style={{width: '40px', height: '40px'}} />
                    </a>
                    <span className="home-feed-title">{layout.heading.user} {layout.heading.verb} <b style={{color: "#286090"}}><i className={layout.heading.icon}></i>{layout.heading.action}</b></span>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "8px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD hh:mm A")}</span>
                        <a href={getHomeFeedURL(feed.university.id)}>
                            <img
                                className="image-circular"
                                src={getUniversityLogo(feed.university.shorthand)}
                                style={{width: '25px', height: '25px'}} />
                        </a>
                    </div>
                </div>
                <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#" className="home-feed-md-profile">
                                <img
                                    className="image-circular"
                                    src={
                                        feed.requester.profile.avatar ? 
                                        feed.requester.profile.avatar : getProfileDefaultPic()
                                    }
                                    style={{width: '60px', height: '60px', marginTop: '-60px', marginLeft: '-7px'}} />
                            </a>
                        </div>
                        <div className="media-body">
                            <div className="row">
                                <BaseContentBody
                                    layout={layout} />
                            </div>
                        </div>
                    </div>
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});