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
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img className="img-circle box-shadow"
                                     src={requester.profile.avatar ? requester.profile.avatar : getProfileDefaultPic()}
                                     style={{width: '60px', height: '60px'}} />
                            </a>
                        </div>
                        <div className="media-body">
                            <p className="media-heading">
                                <i className="glyphicon glyphicon-user"></i>
                                <b> {requester.first_name} {requester.last_name}</b> 
                                &nbsp;needs&nbsp;
                                {pickType == 1 ?
                                    <span className="label label-success">Flight</span> :
                                    <span className="label label-primary">General</span>}
                                &nbsp;pick up
                            </p>
                            <p>
                                {pickType == 1 ?
                                    <div><i className="glyphicon glyphicon-plane"></i> {this.props.pickRequester.flight}</div> :
                                    <div><i className="glyphicon glyphicon-globe"></i> {this.props.pickRequester.start}</div>}
                            </p>
                            <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.pickRequester.destination}</p>
                            <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.pickRequester.price}</p>
                            <p><i className="glyphicon glyphicon-comment"></i> {this.props.pickRequester.description}</p>
                        </div>
                    </div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
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
    handleGeneralSubmit: function(e) {
        e.preventDefault();
        var requester = this.props.currentUser;
        var university = this.props.university;
        // TODO: auto set price according distance
        this.props.onPickRequesterSubmit({
            pick_type : 2,
            price : 20,
            start : this.refs.start2.getDOMNode().value.trim(),
            destination : this.refs.destination2.getDOMNode().value.trim(),
            description : this.refs.description2.getDOMNode().value.trim(),
        }, requester, university);
        this.refs.start2.getDOMNode().value = '';
        this.refs.destination2.getDOMNode().value = '';
        this.refs.description2.getDOMNode().value = '';
    },
    componentDidUpdate: function() {
        var input = document.getElementById('google-map-place1');
        if (!input) {
            return;
        }
        var options = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(input, options);
    },
    render: function() {
        var requester = this.props.currentUser;
        var university = this.props.university;
        if (!university) {
            return <div></div>;
        }
        return (
            <div id="pick-request-post" className="panel panel-primary">
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
                                    <div className="col-sm-4">
                                        <input type="text"
                                               className="form-control" 
                                               placeholder="Your flight number?"
                                               ref="flight1" />
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text"
                                               id="google-map-place1"
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