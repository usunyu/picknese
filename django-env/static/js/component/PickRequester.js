/*
 * Parameters: picker, pickRequester
 * Callback: handlePickupSubmit, onPickRequesterCancel
 */
var PickRequester = React.createClass({
    handleCancel: function(id, modalID) {
        this.props.onPickRequesterCancel(id, modalID);
    },
    getActionButton: function() {
        if (!this.props.pickRequester) {
            return;
        }
        var modalID = "requester-" + this.props.pickRequester.id;
        {/* If it is user's own request */}
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
                        className="btn btn-info"
                        style={{float: 'right', marginRight: '10px'}} >
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;
                        Message
                    </button>
                </div>
            );
        }
    },
    componentDidUpdate: function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    render: function() {
        var requester = this.props.pickRequester.requester;
        var pickType = this.props.pickRequester.pick_type;
        var start = this.props.pickRequester.start;
        var destination = this.props.pickRequester.destination;
        var price = this.props.pickRequester.price;
        var bags = this.props.pickRequester.bags;
        var dateTime = this.props.pickRequester.date_time;
        var round_trip = this.props.pickRequester.round_trip ? "YES" : "NO";
        var time_flexible = this.props.pickRequester.time_flexible ? "YES" : "NO";
        var moment_datetime = moment(dateTime, "YYYY-MM-DD HH:mm");
        var description = this.props.pickRequester.description;

        return (
            <div className="panel panel-primary fadein-effect">
                <div className="panel-heading" />
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img className="img-circle box-shadow"
                                     src={requester.profile.avatar ? requester.profile.avatar : getProfileDefaultPic()}
                                     style={{width: '60px', height: '60px'}} />
                            </a>
                        </div>
                        <div className="media-body ">
                            <div className="row">
                                <p className="media-heading col-md-12"
                                   data-toggle="tooltip"
                                   data-placement="left"
                                   title="Requester">
                                    <i className="glyphicon glyphicon-user"></i>
                                    <b> {requester.first_name} {requester.last_name}</b> 
                                    &nbsp;needs&nbsp;
                                    {pickType == 1 ?
                                        <span className="label label-success">Flight</span> :
                                        <span className="label label-primary">General</span>}
                                    &nbsp;pick up
                                </p>
                                {pickType == 1 ? 
                                <div>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Flight Number">
                                        <i className="glyphicon glyphicon-plane"></i> {start}
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
                                        <i className="glyphicon glyphicon-map-marker"></i> {destination}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Pay">
                                        <i className="glyphicon glyphicon-credit-card"></i> ${price}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Baggage Number">
                                        <i className="glyphicon glyphicon-briefcase"></i> {bags}
                                    </p>
                                </div> : <div>
                                    <p className="col-md-12"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Start">
                                        <i className="glyphicon glyphicon-flag"></i> {start}
                                    </p>
                                    <p className="col-md-12"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Destination">
                                        <i className="glyphicon glyphicon-map-marker"></i> {destination}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Pay">
                                        <i className="glyphicon glyphicon-credit-card"></i> ${price}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Pickup Time">
                                        <i className="glyphicon glyphicon-time"></i> {moment_datetime.format("YYYY-MM-DD HH:mm")}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Round Trip">
                                        <i className="glyphicon glyphicon-repeat"></i> {round_trip}
                                    </p>
                                    <p className="col-md-5"
                                       data-toggle="tooltip"
                                       data-placement="left"
                                       title="Time Flexible">
                                        <i className="glyphicon glyphicon-star"></i> {time_flexible}
                                    </p>
                                </div>
                                }
                                <p className="col-md-12"
                                   data-toggle="tooltip"
                                   data-placement="left"
                                   title="Message">
                                    <i className={description ? "glyphicon glyphicon-comment" : ""}></i> {description} 
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});
