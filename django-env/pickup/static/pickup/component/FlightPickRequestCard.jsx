var FlightPickRequestCard = React.createClass({
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
                    style={{marginLeft: '85px'}}>
                    <a href="#">
                        <b>{feed.requester.first_name} {feed.requester.last_name}</b>
                    </a> is asking for a flight pick up
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
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Flight Number">
                                        <i className="glyphicon glyphicon-plane"></i> {feed.flight}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Arrival Time">
                                        <i className="glyphicon glyphicon-time"></i> {moment_datetime.format("YYYY-MM-DD HH:mm")}
                                    </p>
                                    <p className="col-md-12"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Destination">
                                        <i className="glyphicon glyphicon-map-marker"></i> {feed.destination}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Pay">
                                        <i className="glyphicon glyphicon-credit-card"></i> ${feed.price}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Baggage Number">
                                        <i className="glyphicon glyphicon-briefcase"></i> {feed.bags}
                                    </p>
                                </div>
                                <p className="col-md-12"
                                   data-toggle="tooltip"
                                   data-placement="left"
                                   title="Message">
                                    <i className={feed.description ? "glyphicon glyphicon-comment" : ""}></i> {feed.description} 
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                </div>
            </div>
        );
    }
});