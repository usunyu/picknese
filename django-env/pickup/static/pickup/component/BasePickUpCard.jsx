var BasePickUpCard = React.createClass({
    handlePickUpReject: function() {
        this.props.onReject(this.props.feed, this.props.rejectCallback);
    },
    getSubCard: function() {
        var feed = this.props.feed;
        var layout = this.props.layout;
        switch(layout.body.sub_type) {
            case PICK_REQUEST:
                return (
                    <PickRequestCard
                        feed={feed.pick_request} />
                );
            case FLIGHT_PICK_REQUEST:
                return (
                    <FlightPickRequestCard
                        feed={feed.flight_pick_request} />
                );
        }
        return (
            <div></div>
        );
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own offer */}
        if (current_user.id == feed.picker.id) {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#feed-" + feed.id}>
                        <i className="glyphicon glyphicon-remove"></i>&nbsp;
                        Cancel
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#feed-" + feed.id}>
                        <i className="glyphicon glyphicon-remove"></i>&nbsp;
                        Reject
                    </button>
                    {/* Reject Button Modal */}
                    <WarningConfirmationModal
                        feed={feed}
                        title={"Reject Confirmation"}
                        text={"Are you sure want to reject this offer?"}
                        onConfirm={this.handlePickUpReject} />
                </div>
            );
        }
    },
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
                                feed.picker.profile.avatar ? 
                                feed.picker.profile.avatar : getProfileDefaultPic()
                            }
                            style={{width: '40px', height: '40px'}} />
                    </a>
                    <b className="home-feed-title">{layout.heading.user} {layout.heading.verb} <span className="label label-success" style={{fontSize: "95%"}}>{layout.heading.action}</span></b>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "8px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD HH:mm")}</span>
                        <i className={layout.heading.icon} style={{marginTop: "3px"}}></i>
                    </div>
                </div>
                <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                <div className="panel-body" style={{paddingBottom: "0px"}}>
                    <div className="media-left">
                        <a href="#" className="home-feed-md-profile">
                            <img
                                className="image-circular"
                                src={
                                    feed.picker.profile.avatar ? 
                                    feed.picker.profile.avatar : getProfileDefaultPic()
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

                {this.getSubCard()}
                
                <div className="panel-body home-feed-panel-body-nested-div">
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});