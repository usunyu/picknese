var PickupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var message = this.refs.message.getDOMNode().value.trim();
        this.props.onPickupSubmit({
            picker : this.props.picker.id,
            pickee : this.props.requester.id,
            university : this.props.university.id,
            pick_type : this.props.pick_type,
            flight : this.props.flight,
            price : this.props.price,
            destination : this.props.destination,
            description : message,
        });
        $('#' + this.props.modalID).modal('hide')
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <img
                    className="img-circle box-shadow"
                    src={this.props.requester.profile.avatar}
                    style={{width: '90px', height: '90px', marginBottom: '15px'}} />
                <p><b>{this.props.requester.first_name} {this.props.requester.last_name}</b></p>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Thanks for your kindndess, leve a message?"
                        ref="message">
                    </textarea>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Confirm
                    </button>
                </div>
            </form>
        );
    }
});

var PickRequester = React.createClass({
    render: function() {
        var modalID = "requester-" + this.props.pick_requester_id;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                    <img
                        className="img-circle box-shadow"
                        src={this.props.requester.profile.avatar}
                        style={{width: '80px', height: '80px', marginBottom: '15px'}} />
                </div>
                <div className="col-xs-12 col-sm-9 col-md-10 col-lg-10">
                    <p>
                        <i className="glyphicon glyphicon-user"></i>
                        <b> {this.props.requester.first_name} {this.props.requester.last_name}</b>
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
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <hr />
                </div>
                <button
                    type="button"
                    className="btn btn-default"
                    style={{float: 'right'}}
                    data-toggle="modal"
                    data-target={"#" + modalID}>
                    <i className="glyphicon glyphicon-heart"></i>&nbsp;
                    Offer Your Pick Up
                </button>
                <button
                    type="button"
                    className="btn btn-default"
                    style={{float: 'right', marginRight: '10px'}} >
                    <i className="glyphicon glyphicon-envelope"></i>&nbsp;
                    Message
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
                                    requester={this.props.requester}
                                    picker={this.props.picker}
                                    university={this.props.university}
                                    pick_type={this.props.pick_type}
                                    price={this.props.price}
                                    flight={this.props.flight}
                                    destination={this.props.destination}
                                    onPickupSubmit={this.props.handlePickupSubmit}
                                    modalID={modalID}
                                />
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
                        pick_requester_id={pickRequester.id}
                        picker={this.props.currentUser}
                        requester={pickRequester.requester}
                        pick_type={pickRequester.pick_type}
                        price={pickRequester.price}
                        flight={pickRequester.flight}
                        university={pickRequester.university}
                        destination={pickRequester.destination}
                        description={pickRequester.description} 
                        handlePickupSubmit={this.props.handlePickupSubmit} />
                );
            }
        }
        return (
            <div>{pickRequesters}</div>
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

var CalendarPanel = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <div id="calendar"></div>
                <div id="calendar_data"></div>
            </div>
        );
    }
});

var PickRequesterPanel = React.createClass({
    loadPickRequestersFromServer: function() {
        var requestersUrl = this.props.requestersUrl + this.props.universityID + "/";
        $.ajax({
            url: requestersUrl,
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(requestersUrl, status, err.toString());
            }.bind(this)
        });
    },
    loadPickUpsFromServer: function() {
        var pickupsUrl = this.props.pickupsUrl + this.props.universityID + "/";
        $.ajax({
            url: pickupsUrl,
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(pickupsUrl, status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserFromServer: function() {
        $.ajax({
            url: this.props.currentUserUrl,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.currentUserUrl, status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(pickup) {
        var pickupsUrl = this.props.pickupsUrl + this.props.universityID + "/";
        $.ajax({
            url: pickupsUrl,
            dataType: 'json',
            type: 'POST',
            data: pickup,
            success: function(data) {
                current_pickups = this.state.pickups;
                current_pickups.push(data);
                this.setState({pickups: current_pickups});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.pickupUrl, status, err.toString());
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
        this.loadPickRequestersFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);

        this.loadPickUpsFromServer();
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);

        this.loadCurrentUserFromServer();
    },
    render: function() {
        return (
            <div className="row col-md-12">
                <div className="col-xs-12 col-sm-3">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser} />
                    <CalendarPanel
                        currentUser={this.state.currentUser} />
                </div>
                <div className="col-xs-12 col-sm-7">
                    <PickRequesterList
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        handlePickupSubmit={this.handlePickupSubmit} />
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
        universityID={document.getElementById('content').getAttribute('university_id')}
        pollInterval={20000}/>,
    document.getElementById('content')
);