var PickRequestCard = React.createClass({
    componentDidUpdate: function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    handleRequestCancel: function() {
        var feed = this.props.feed;
        this.props.onCancel(feed);
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
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
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-edit"></i>&nbsp;
                        Update
                    </button>
                    {/* Cancel Button Modal */}
                    <div
                        id={"feed-" + feed.id}
                        className="modal fade"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="modalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header" style={{backgroundColor: "#ff9800"}}>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        style={{color: "white"}}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" style={{color: "white"}}>
                                        Cancel Confirmation
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure want to cancel this request?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleRequestCancel}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
        }
    },
    render: function() {
        var feed = this.props.feed;
        return (
            <div className="panel panel-primary clearfix fadein-effect">
                <h6
                    style={{marginLeft: '80px', marginRight: '4px', color: '#666666'}}>
                    <a href="#">
                        <b>{feed.requester.first_name} {feed.requester.last_name}</b>
                    </a>
                    <b> is looking for <span className="label label-success" style={{fontSize: "95%"}}>pick up</span></b>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "15px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD HH:mm")}</span>
                        <i className="glyphicon glyphicon-tag" style={{marginRight: "10px"}}></i>
                    </div>
                </h6>
                <hr style={{marginTop: '9px', marginBottom: '0px'}}/>
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
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
                                <div>
                                    <p
                                        className="col-md-10"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Start">
                                        <i className="glyphicon glyphicon-tag"></i> {feed.start}
                                    </p>
                                    <p
                                        className="col-md-10"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Destination">
                                        <i className="glyphicon glyphicon-map-marker"></i> {feed.destination}
                                    </p>
                                    <p
                                        className="col-md-5"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Pick Time">
                                        <i className="glyphicon glyphicon-time"></i> {moment(feed.date_time).format("YYYY-MM-DD HH:mm")}
                                    </p>
                                    <p
                                        className="col-md-5"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Pay">
                                        <i className="glyphicon glyphicon-credit-card"></i> ${feed.price}
                                    </p>
                                    {feed.description ? 
                                    <p
                                        className="col-md-10"
                                        data-toggle="tooltip"
                                        data-placement="left"
                                        title="Message">
                                        <i className={feed.description ? "glyphicon glyphicon-comment" : ""}></i> {feed.description} 
                                    </p> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});