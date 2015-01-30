var PickupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var message = this.refs.message.getDOMNode().value.trim();
        return;
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <img
                    className="img-circle box-shadow"
                    src={this.props.avatar}
                    style={{width: '90px', height: '90px', marginBottom: '15px'}} />
                <p><b>{this.props.first_name} {this.props.last_name}</b></p>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Thanks for your kindndess, please leve a message."
                        ref="message">
                    </textarea>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }
});

var PickRequester = React.createClass({
    render: function() {
        var modalID = "requester-" + this.props.id;
        return (
            <div>
                <hr />
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
                <button
                    type="button"
                    className="btn btn-default"
                    data-toggle="modal"
                    data-target={"#" + modalID}>
                    Offer Your Pick Up
                </button>
                <div
                    className="modal fade" id={modalID} tabIndex="-1"
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
                                <PickupForm 
                                    avatar={this.props.avatar} 
                                    first_name={this.props.first_name}
                                    last_name={this.props.last_name}
                                />
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
                        id={pickRequester.id}
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
            <div className="panel panel-default">
                <div className="panel-body">
                    {pickRequesters}
                </div>
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

var CurrentUserPanel = React.createClass({
    render: function() {
        if (!this.props.currentUser) {
            return (
                <div></div>
            );        
        }
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <img
                        className="img-circle box-shadow"
                        src={this.props.currentUser.profile.avatar}
                        style={{width: '100px', height: '100px'}} />
                    <hr />
                    <p>Hello World</p>
                </div>
                <hr />
            </div>
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
                // console.error(url, status, err.toString());
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
                // console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserFromServer: function(url) {
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                // console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            requesters: [],
            pickups: [],
            currentUser: null,
        };
    },
    componentDidMount: function() {
        var universityID = document.getElementById('content').getAttribute('university_id');
        this.loadPickRequestersFromServer(this.props.requestersUrl + universityID);
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);
        this.loadPickUpsFromServer(this.props.pickupsUrl + universityID);
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);
        this.loadCurrentUserFromServer(this.props.currentUserUrl);
    },
    render: function() {
        return (
            <div className="row col-md-12">
                <div className="col-xs-12 col-sm-3">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser} />
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
        currentUserUrl="/accounts/api/me/"
        pollInterval={20000}/>,
    document.getElementById('content')
);