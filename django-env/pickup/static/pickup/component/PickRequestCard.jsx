var PickRequestCard = React.createClass({
    componentDidUpdate: function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    render: function() {
        var feed = this.props.feed;
        var moment_datetime = moment(feed.date_time, "YYYY-MM-DD HH:mm");

        return (
            <div className="panel panel-primary clearfix fadein-effect">
                <h6
                    style={{marginLeft: '80px', marginRight: '4px', color: '#666666'}}>
                    <a href="#">
                        <b>{feed.requester.first_name} {feed.requester.last_name}</b>
                    </a>
                    <b> is looking for <span className="label label-success" style={{fontSize: "95%"}}>pick up</span></b>
                    <i className="glyphicon glyphicon-tag hidden-xs" style={{float: "right", marginRight: "10px"}}></i>
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
                                        <i className="glyphicon glyphicon-time"></i> {moment_datetime.format("YYYY-MM-DD HH:mm")}
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
                </div>
            </div>
        );
    }
});