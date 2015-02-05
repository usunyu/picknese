var PickupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onPickupSubmit({
            picker : this.props.picker,
            pickee : this.props.pickRequester.requester,
            university : this.props.pickRequester.university,
            pickType : this.props.pickRequester.pick_type,
            flight : this.props.pickRequester.flight,
            price : this.props.pickRequester.price,
            destination : this.props.pickRequester.destination,
            description : this.refs.message.getDOMNode().value.trim(),
        }, this.props.pickRequester);
        $('#' + this.props.modalID).modal('hide')
    },
    render: function() {
        var requester = this.props.pickRequester.requester;
        return (
            <form onSubmit={this.handleSubmit}>
                <img
                    className="img-circle box-shadow"
                    src={requester.profile.avatar}
                    style={{width: '90px', height: '90px', marginBottom: '15px'}} />
                <p><b>{requester.first_name} {requester.last_name}</b></p>
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
        var modalID = "requester-" + this.props.pickRequester.id;
        var requester = this.props.pickRequester.requester;
        var pickType = this.props.pickRequester.pick_type;
        var destination = this.props.pickRequester.destination;
        var price = this.props.pickRequester.price;
        var description = this.props.pickRequester.description;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                    <img
                        className="img-circle box-shadow"
                        src={requester.profile.avatar}
                        style={{width: '80px', height: '80px', marginBottom: '15px'}} />
                </div>
                <div className="col-xs-12 col-sm-9 col-md-10 col-lg-10">
                    <p>
                        <i className="glyphicon glyphicon-user"></i>
                        <b> {requester.first_name} {requester.last_name}</b>
                        &nbsp;needs a&nbsp;
                        {pickType == 1 ?
                            <span className="label label-success">Flight</span> :
                            <span className="label label-primary">General</span>}
                        &nbsp;pick up
                    </p>
                    <p><i className="glyphicon glyphicon-map-marker"></i> {destination}</p>
                    <p><i className="glyphicon glyphicon-credit-card"></i> ${price}</p>
                    <p><i className="glyphicon glyphicon-comment"></i> {description}</p>
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
                                    pickRequester={this.props.pickRequester}
                                    picker={this.props.picker}
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
                        key={pickRequester.id}
                        pickRequester={pickRequester}
                        picker={this.props.currentUser}
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
                    key={pickup.id}
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
    loadPickRequestersFromServer: function() {
        var requestersListURL = this.props.requestersListURL + this.props.universityID + "/";
        $.ajax({
            url: requestersListURL,
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(requestersListURL, status, err.toString());
            }.bind(this)
        });
    },
    loadPickUpsFromServer: function() {
        var pickupListURL = this.props.pickupListURL + this.props.universityID + "/";
        $.ajax({
            url: pickupListURL,
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(pickupListURL, status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserFromServer: function() {
        $.ajax({
            url: this.props.currentUserURL,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.currentUserURL, status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(pickup, pickRequester) {
        // Create PickUp
        var pickupData = {
            picker : pickup.picker.id,
            pickee : pickup.pickee.id,
            university : pickup.university.id,
            pickType : pickup.pickType,
            flight : pickup.flight,
            price : pickup.price,
            destination : pickup.destination,
            description : pickup.description,
        };
        $.ajax({
            url: this.props.pickupCreateURL,
            dataType: 'json',
            type: 'POST',
            data: pickupData,
            success: function(data) {
                var currentPickups = this.state.pickups;
                currentPickups.push(pickup);
                this.setState({pickups: currentPickups});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.pickupCreateURL, status, err.toString());
            }.bind(this)
        });
        // Update PickRequester confirmed field
        var pickRequesterData = {
            id : pickRequester.id,
            pick_type : pickRequester.pick_type,
            price : pickRequester.price,
            flight : pickRequester.flight,
            destination : pickRequester.destination,
            confirmed : true,
            description : pickRequester.description,
            requester : pickRequester.requester.id,
            university : pickRequester.university.id,
        };
        var requestersMutateURL = this.props.requestersMutateURL + pickRequester.id + "/";
        $.ajax({
            url: requestersMutateURL,
            dataType: 'json',
            type: 'PUT',
            data: pickRequesterData,
            success: function(data) {
                var currentRequesters = this.state.requesters;
                for (var i = 0; i < currentRequesters.length; i++) {
                    requester = currentRequesters[i];
                    if (requester.id == pickRequester.id) {
                        currentRequesters[i].confirmed = true;
                    }
                }
                this.setState({requesters: currentRequesters});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(requestersMutateURL, status, err.toString());
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
        requestersListURL="/pickup/api/requesters/"
        requestersMutateURL="/pickup/api/requesters/mutate/"
        pickupListURL="/pickup/api/"
        pickupCreateURL="/pickup/api/create/"
        currentUserURL="/accounts/api/me/"
        universityID={document.getElementById('hiddenParam').getAttribute('universityID')}
        pollInterval={20000}/>,
    document.getElementById('content')
);