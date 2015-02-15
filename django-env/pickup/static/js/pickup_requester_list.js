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
        $('#' + this.props.modalID).modal('hide');
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
    getActionButton: function(picker, requester, pickRequester, handlePickupSubmit, modalID) {
        if (picker.id == requester.id) {
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
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-pencil"></i>&nbsp;
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
                        className="btn btn-default"
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
                                        pickRequester={pickRequester}
                                        picker={picker}
                                        onPickupSubmit={handlePickupSubmit}
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
        var modalID = "requester-" + this.props.pickRequester.id;
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
                    {this.getActionButton(
                        this.props.picker,
                        requester,
                        this.props.pickRequester,
                        this.props.handlePickupSubmit,
                        modalID
                    )}
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
            <div>
                <PickRequestPostPanel />
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

var PickRequesterForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var requester = this.props.currentUser;
        var university = this.props.university;
        this.props.onPickRequesterSubmit({
            pick_type : this.refs.pickupType.getDOMNode().value.trim(),
            price : this.refs.price.getDOMNode().value.trim(),
            flight : this.refs.flight.getDOMNode().value.trim(),
            destination : this.refs.destination.getDOMNode().value.trim(),
            description : this.refs.description.getDOMNode().value.trim(),
        }, requester, university);
        // $('#' + this.props.modalID).modal('hide');
    },
    render: function() {
        var requester = this.props.currentUser;
        var university = this.props.university;
        if (!university) {
            return <div></div>;
        }
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="col-md-12">
                    <div className="col-xs-5 col-sm-5 col-md-5 text-center">
                        <img
                            className="img-circle box-shadow"
                            src={requester.profile.avatar}
                            style={{width: '90px', height: '90px', marginBottom: '15px'}} />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 text-center">
                        <i className="glyphicon glyphicon-arrow-right" style={{fontSize: "2em", marginTop: "30px"}}></i>
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 text-center">
                        <img
                            src={getUniversityLogo(university.shorthand)}
                            className="img-thumbnail img-responsive img-center box-shadow-light"
                            style={{width: '90px'}} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Pick Up Type</label>
                    <div className="col-sm-9">
                        <select className="form-control"
                                ref="pickupType">
                            <option value='1'>Flight</option>
                            <option value='2'>General</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Tips</label>
                    <div className="col-sm-9">
                        <input type="number"
                               className="form-control" 
                               placeholder="Provide tips to your picker"
                               defaultValue="20"
                               ref="price" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Flight#</label>
                    <div className="col-sm-9">
                        <input type="text"
                               className="form-control" 
                               placeholder="Flight Number"
                               ref="flight" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Destination</label>
                    <div className="col-sm-9">
                        <input type="text"
                               className="form-control" 
                               placeholder="Where you want to go?"
                               defaultValue="Near Campus"
                               ref="destination" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Message</label>
                    <div className="col-sm-9">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Any thing you want to mention?"
                            ref="description">
                        </textarea>
                    </div>
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

var PickRequestPostPanel = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Panel title</h4>
                </div>
                <div className="panel-body">
                    Panel content
                </div>
                <div className="panel-footer">Panel footer</div>
            </div>
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
    handlePickupSubmit: function(pickup, requester) {
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
                this.setState({pickups: currentPickups});
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
                this.setState({requesters: currentRequesters});
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
                $('#currentUserRequestPost').modal('hide');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterCreateAPI(), status, err.toString());
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
                        university={this.state.university}
                        handlePickRequesterSubmit={this.handlePickRequesterSubmit} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
                    <PickRequesterList
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        handlePickupSubmit={this.handlePickupSubmit} />
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
        pollInterval={20000}/>,
    document.getElementById('content')
);