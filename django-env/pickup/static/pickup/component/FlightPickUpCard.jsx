
var FlightPickUpCard = React.createClass({
    render: function() {
        var feed = this.props.feed;
        var flight_pick_request = feed.flight_pick_request;
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
                    <b className="home-feed-title">{feed.picker.first_name} {feed.picker.last_name} is taking this <span className="label label-success" style={{fontSize: "95%"}}>flight pick request</span></b>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "8px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD HH:mm")}</span>
                        <i className="icon-ok-circled" style={{marginTop: "3px"}}></i>
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
                            <p
                                className="col-md-12"
                                data-toggle="tooltip"
                                data-placement="left"
                                title="Message" >
                                <i className="glyphicon glyphicon-comment"></i> {feed.description}
                            </p>
                        </div>
                    </div>
                </div>

                <FlightPickRequestCard
                    feed={flight_pick_request}
                    onCancel={this.props.onCancel}
                    cancelCallback={this.props.cancelCallback}
                    onReject={this.props.onReject}
                    rejectCallback={this.props.rejectCallback} />
                
                <div className="panel-body home-feed-panel-body-nested-div">
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
                    </div>
                </div>
            </div>
        );
    }
});