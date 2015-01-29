var PickRequester = React.createClass({
    render: function() {
        return (
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Panel title</h3>
                    </div>
                    <div className="panel-body">
                        <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                            <img
                                className="img-circle box-shadow"
                                src={this.props.avatar}
                                style={{width: '80px', height: '80px', marginBottom: '15px'}} />
                        </div>
                        <div className="col-xs-12 col-sm-9 col-md-10 col-lg-10">
                            <p>
                                <i className="glyphicon glyphicon-user"></i>
                                <b> {this.props.first_name} {this.props.last_name}</b>
                                &nbsp;needs a&nbsp;
                                {this.props.pick_type == 1 ?
                                    <span className="label label-success">Flight</span> :
                                    <span className="label label-primary">General</span>}
                                &nbsp;pick up
                            </p>
                            <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.destination}</p>
                            <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.price}</p>
                            <p><i className="glyphicon glyphicon-comment"></i> {this.props.description}</p>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button
                            type="button"
                            className="btn btn-default"
                            data-toggle="modal"
                            data-target="#test_XXX">
                            Offer Your Pick Up
                        </button>
                        <div
                            className="modal fade" id="test_XXX" tabIndex="-1"
                            role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button
                                            type="button" className="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h5 className="modal-title" id="modalLabel">
                                            Offer Pick Up
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            if (!pickRequester.confirmed) {
                pickRequesters.push(
                    <PickRequester
                        username={pickRequester.requester.username}
                        first_name={pickRequester.requester.first_name}
                        last_name={pickRequester.requester.last_name}
                        email={pickRequester.requester.email}
                        avatar={pickRequester.requester.profile.avatar}
                        pick_type={pickRequester.pick_type}
                        price={pickRequester.price}
                        flight={pickRequester.flight}
                        destination={pickRequester.destination}
                        description={pickRequester.description} />
                );
            }
        }
        return (
            <div className="row">
                {pickRequesters}
            </div>
        );
    }
});

var PickRecord = React.createClass({
    render: function() {
        return (
            <li className="feed-item">
                <time className="date" dateTime="9-22">Sep 22</time>
                <span className="text" >
                    <a href="#">{this.props.picker.first_name} {this.props.picker.last_name}</a>
                    &nbsp;will pick up&nbsp;
                    <a href="#">{this.props.pickee.first_name} {this.props.pickee.last_name}</a>
                </span>
            </li>
        );
    }
});

var PickRecordList = React.createClass({
    render: function() {
        var pickRecords = [];
        for (var i = 0; i < this.props.pickups.length; i++) {
            var pickup = this.props.pickups[i];
            pickRecords.push(
                <PickRecord
                    pickee={pickup.pickee}
                    picker={pickup.picker}
                    // TODO: add real time in model
                    time={""} />
            );
        }
        return (
            <ol className="activity-feed">
                {pickRecords}
            </ol>
        );
    }
});

var PickRequesterPanel = React.createClass({
    loadPickRequestersFromServer: function(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.url, status, err.toString());
            }.bind(this)
        });
    },
    loadPickUpsFromServer: function(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            requesters: [],
            pickups: [],
        };
    },
    componentDidMount: function() {
        var universityID = document.getElementById('content').getAttribute('university_id');
        this.loadPickRequestersFromServer(this.props.requestersUrl + universityID);
        this.loadPickUpsFromServer(this.props.pickupsUrl + universityID);
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-3 sidebar-offcanvas">
                    <PickRecordList
                        pickups={this.state.pickups} />
                </div>
                <div className="col-xs-12 col-sm-7">
                    <PickRequesterList
                        requesters={this.state.requesters} />
                </div>
                <div className="col-xs-12 col-sm-2 sidebar-offcanvas">
                    <PickRecordList
                        pickups={this.state.pickups} />
                </div>
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel
        requestersUrl="/pickup/api/requesters2/"
        pickupsUrl="/pickup/api/"
        pollInterval={20000}/>,
    document.getElementById('content')
);