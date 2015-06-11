var BaseRequestCard = React.createClass({
    handleRequestCancel: function() {
        this.props.onCancel(this.props.feed, this.props.cancelCallback);
    },
    getOfferActionButtonModalID: function() {
        if (jQuery.isEmptyObject(current_user)) {
            return "#login-modal";
        } else {
            var feed = this.props.feed;
            return "#feed-" + feed.id;
        }
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
            if (feed.confirmed) {
                return (null);
            }
            return (
                <div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#feed-" + feed.id}>
                        <i className="glyphicon glyphicon-remove"></i>&nbsp;
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-edit"></i>&nbsp;
                        Update
                    </button>
                    {/* Cancel Button Modal */}
                    <WarningConfirmationModal
                        feed={feed}
                        title={"Cancel Confirmation"}
                        text={"Are you sure want to cancel this request?"}
                        onConfirm={this.handleRequestCancel} />
                </div>
            );
        } else {
            if (feed.confirmed) {
                return (null);
            }
            return (
                <div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={this.getOfferActionButtonModalID()}>
                        <i className="glyphicon glyphicon-heart"></i>&nbsp;
                        Offer Help
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-edit"></i>&nbsp;
                        Comment
                    </button>
                    {/* Offer Button Modal */}
                    <div
                        id={"feed-" + feed.id}
                        className="modal fade"
                        tabIndex="-1"
                        role="dialog"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{backgroundColor: "#4caf50"}}>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        style={{color: "white"}}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" style={{color: "white"}}>
                                        Offer Confirmation
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <textarea
                                            id="pick-up-desc-textarea"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Thanks for taking this request, anything you want to mention?">
                                        </textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.props.onSubmit}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                feed.requester.profile.avatar ? 
                                feed.requester.profile.avatar : getProfileDefaultPic()
                            }
                            style={{width: '40px', height: '40px'}} />
                    </a>
                    <b className="home-feed-title">{layout.heading.user} {layout.heading.verb} <span className="label label-danger" style={{fontSize: "95%"}}>{layout.heading.action}</span></b>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "8px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD HH:mm")}</span>
                        <i className={layout.heading.icon} style={{marginRight: "15px", marginTop: "3px"}}></i>
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