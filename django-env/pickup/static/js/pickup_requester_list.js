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
        }, this.props.pickRequester, this.props.modalID);
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
    handleCancel: function(id, modalID) {
        this.props.onPickRequesterCancel(id, modalID);
    },
    getActionButton: function() {
        var modalID = "requester-" + this.props.pickRequester.id;
        if (this.props.picker.id == this.props.pickRequester.requester.id) {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#" + modalID}>
                        <i className="glyphicon glyphicon-remove"></i>&nbsp;
                        Cancel
                    </button>
                    <div
                        className="modal fade" id={modalID} tabIndex="-1"
                        role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" id="modalLabel">
                                        Cancel Confirmation
                                    </h5>
                                </div>
                                <hr style={{marginTop: "-10px"}}/>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" 
                                            onClick={this.handleCancel.bind(this, this.props.pickRequester.id, modalID)}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-edit"></i>&nbsp;
                        Update
                    </button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#" + modalID}>
                        <i className="glyphicon glyphicon-heart"></i>&nbsp;
                        Offer Help
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
                                </div>
                                <hr style={{marginTop: "-10px"}}/>
                                <div className="modal-body">
                                    <PickupForm 
                                        pickRequester={this.props.pickRequester}
                                        picker={this.props.picker}
                                        onPickupSubmit={this.props.handlePickupSubmit}
                                        modalID={modalID}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-default"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;
                        Message
                    </button>
                </div>
            );
        }
    },
    render: function() {
        var requester = this.props.pickRequester.requester;
        var pickType = this.props.pickRequester.pick_type;
        return (
            <div className="panel panel-default fadein-effect">
                <div className="panel-body">
                    <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                        <img
                            className="img-circle box-shadow"
                            src={requester.profile.avatar ? requester.profile.avatar : getMediaURL() + "media/default_pic.png"}
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
                        <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.pickRequester.destination}</p>
                        <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.pickRequester.price}</p>
                        <p><i className="glyphicon glyphicon-comment"></i> {this.props.pickRequester.description}</p>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <hr />
                    </div>
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});

var PickRequesterForm = React.createClass({
    handleFlightSubmit: function(e) {
        e.preventDefault();
        var requester = this.props.currentUser;
        var university = this.props.university;
        // TODO: auto set price according distance
        this.props.onPickRequesterSubmit({
            pick_type : 1,
            price : 20,
            flight : this.refs.flight1.getDOMNode().value.trim(),
            destination : this.refs.destination1.getDOMNode().value.trim(),
            description : this.refs.description1.getDOMNode().value.trim(),
        }, requester, university);
        this.refs.flight1.getDOMNode().value = '';
        this.refs.destination1.getDOMNode().value = '';
        this.refs.description1.getDOMNode().value = '';
    },
    render: function() {
        var requester = this.props.currentUser;
        var university = this.props.university;
        if (!university) {
            return <div></div>;
        }
        return (
            <div className="panel panel-primary">
                <div className="panel-heading clearfix">
                    <ul className="inline-list col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style={{marginBottom: "0px"}}>
                        <li className="active col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <i className="glyphicon glyphicon-plane"></i>&nbsp;
                            <a href="#tab_flight" data-toggle="tab">Flight</a>
                        </li>
                        <li className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <i className="glyphicon glyphicon-globe"></i>&nbsp;
                            <a href="#tab_general" data-toggle="tab">General</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fadein-effect active" id="tab_flight">
                        <form className="form-horizontal" onSubmit={this.handleFlightSubmit}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Your flight number?"
                                               ref="flight1" />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Where you want to go?"
                                               ref="destination1" />
                                    </div>
                                    <div className="col-sm-12">
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            placeholder="Any thing you want to mention?"
                                            ref="description1">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                                <button
                                    type="submit"
                                    style={{float: 'right'}}
                                    className="btn btn-primary">
                                    Post Your Request
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fadein-effect" id="tab_general">
                        <form className="form-horizontal" onSubmit={this.handleGeneralSubmit}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Where to pick up you?"
                                               ref="start2" />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Where you want to go?"
                                               ref="destination2" />
                                    </div>
                                    <div className="col-sm-12">
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            placeholder="Any thing you want to mention?"
                                            ref="description2">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer clearfix">
                                <button
                                    type="submit"
                                    style={{float: 'right'}}
                                    className="btn btn-primary">
                                    Post Your Request
                                </button>
                            </div>
                        </form>
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
                        handlePickupSubmit={this.props.handlePickupSubmit}
                        onPickRequesterCancel={this.props.handlePickRequesterCancel} />
                );
            }
        }
        return (
            <div>
                <PickRequesterForm 
                    currentUser={this.props.currentUser}
                    university={this.props.university}
                    onPickRequesterSubmit={this.props.handlePickRequesterSubmit} />
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

var PickRequesterPanel = React.createClass({
    mixins: [LoadCurrentUserMixin, 
             LoadUniversityMixin],
    loadPickRequestersFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getPickRequesterListAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterListAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    loadPickUpsFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getPickUpListAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickUpListAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(pickup, requester, modalID) {
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
            url: getPickUpCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: pickupData,
            success: function(data) {
                var currentPickups = this.state.pickups;
                currentPickups.push(pickup);
                // this.setState({pickups: currentPickups});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickUpCreateAPI(), status, err.toString());
            }.bind(this)
        });
        // Update PickRequester confirmed field
        var pickRequesterData = {
            id : requester.id,
            pick_type : requester.pick_type,
            price : requester.price,
            flight : requester.flight,
            destination : requester.destination,
            confirmed : true,
            description : requester.description,
            requester : requester.requester.id,
            university : requester.university.id,
        };
        $.ajax({
            url: getPickRequesterMutateAPI(requester.id),
            dataType: 'json',
            type: 'PUT',
            data: pickRequesterData,
            success: function(data) {
                var currentRequesters = this.state.requesters;
                for (var i = 0; i < currentRequesters.length; i++) {
                    requester = currentRequesters[i];
                    if (requester.id == requester.id) {
                        currentRequesters[i].confirmed = true;
                    }
                }
                // this.setState({requesters: currentRequesters});
                // close dialog on success
                $('#' + modalID).modal('hide');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requester.id), status, err.toString());
            }.bind(this)
        });
    },
    handlePickRequesterSubmit: function(form, requester, university) {
        // Create Pick Requester
        var destination = form.destination;
        if (!destination) {
            // TODO, show error message
            alert('Please input destination');
            return;
        }
        var requesterData = {
            requester : requester.id,
            university : university.id,
            pick_type : form.pick_type,
            price : form.price,
            confirmed: false,
            flight : form.flight,
            destination : form.destination,
            description : form.description,
        }
        var pickRequester = {
            requester : requester,
            university : university,
            pick_type : form.pick_type,
            price : form.price,
            confirmed: false,
            flight : form.flight,
            destination : form.destination,
            description : form.description,
        }
        $.ajax({
            url: getPickRequesterCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: requesterData,
            success: function(data) {
                var currentRequesters = this.state.requesters;
                currentRequesters.push(pickRequester);
                this.setState({requesters: currentRequesters});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterCreateAPI(), status, err.toString());
            }.bind(this)
        });
    },
    handlePickRequesterCancel: function(requestID, modalID) {

        // var index = indexOfElemInArray(this.state.requesters, 'id', requestID);
        // var currentRequesters = this.state.requesters;
        // currentRequesters.splice(index, 1);
        // console.log(currentRequesters);
        // this.setState({requesters: []});
        // $('#' + modalID).modal('hide');
        // return;
        $.ajax({
            url: getPickRequesterMutateAPI(requestID),
            type: 'DELETE',
            success: function(data) {
                // var currentRequesters = this.state.requesters;
                // var pickRequesters = [];
                // for (var i = 0; i < currentRequesters.length; i++) {
                //     var pickRequester = currentRequesters[i];
                //     if (pickRequester.id != requestID) {
                //         pickRequesters.push(pickRequester);
                //     }
                // }
                // this.setState({requesters: pickRequesters});
                $('#' + modalID).modal('hide');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requestID), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            requesters: [],
            pickups: [],
            currentUser: null,
            university: null,
        };
    },
    componentDidMount: function() {
        this.loadPickRequestersFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);

        this.loadPickUpsFromServer();
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        university={this.state.university} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
                    <PickRequesterList
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        university={this.state.university}
                        handlePickupSubmit={this.handlePickupSubmit}
                        handlePickRequesterSubmit={this.handlePickRequesterSubmit}
                        handlePickRequesterCancel={this.handlePickRequesterCancel} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-2 sidebar-offcanvas fadein-effect">
                    <PickRecordList
                        pickups={this.state.pickups} />
                </div>
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel
        pickupCreateURL="/pickup/api/create/"
        pollInterval={10000}/>,
    document.getElementById('content')
);