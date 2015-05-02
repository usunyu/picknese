/*
 * Parameters: picker, pickRequester
 * Callback: handlePickupSubmit, onPickRequesterCancel
 */
var PickRequester = React.createClass({displayName: "PickRequester",
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
                React.createElement("div", null, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-warning", 
                        style: {float: 'right'}, 
                        "data-toggle": "modal", 
                        "data-target": "#" + modalID}, 
                        React.createElement("i", {className: "glyphicon glyphicon-remove"}), " " + ' ' +
                        "Cancel"
                    ), 
                    React.createElement("div", {
                        className: "modal fade", id: modalID, tabIndex: "-1", 
                        role: "dialog", "aria-labelledby": "modalLabel", "aria-hidden": "true"}, 
                        React.createElement("div", {className: "modal-dialog modal-sm"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header"}, 
                                    React.createElement("button", {
                                        type: "button", className: "close", "data-dismiss": "modal", 
                                        "aria-label": "Close"}, 
                                        React.createElement("span", {"aria-hidden": "true"}, "×")
                                    ), 
                                    React.createElement("h5", {className: "modal-title", id: "modalLabel"}, 
                                        "Cancel Confirmation"
                                    )
                                ), 
                                React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                React.createElement("div", {className: "modal-footer"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                    React.createElement("button", {type: "button", className: "btn btn-primary", 
                                            onClick: this.handleCancel.bind(this, this.props.pickRequester.id, modalID)}, 
                                        "Confirm"
                                    )
                                )
                            )
                        )
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-primary", 
                        style: {float: 'right', marginRight: '10px'}}, 
                        React.createElement("i", {className: "glyphicon glyphicon-edit"}), " " + ' ' +
                        "Update"
                    )
                )
            );
        }
        else {
            return (
                React.createElement("div", null, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-success", 
                        style: {float: 'right'}, 
                        "data-toggle": "modal", 
                        "data-target": "#" + modalID}, 
                        React.createElement("i", {className: "glyphicon glyphicon-heart"}), " " + ' ' +
                        "Offer Help"
                    ), 
                    React.createElement("div", {
                        className: "modal fade", id: modalID, tabIndex: "-1", 
                        role: "dialog", "aria-labelledby": "modalLabel", "aria-hidden": "true"}, 
                        React.createElement("div", {className: "modal-dialog"}, 
                            React.createElement("div", {className: "modal-content"}, 
                                React.createElement("div", {className: "modal-header"}, 
                                    React.createElement("button", {
                                        type: "button", className: "close", "data-dismiss": "modal", 
                                        "aria-label": "Close"}, 
                                        React.createElement("span", {"aria-hidden": "true"}, "×")
                                    ), 
                                    React.createElement("h5", {className: "modal-title", id: "modalLabel"}, 
                                        "Offer Pick Up"
                                    )
                                ), 
                                React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                React.createElement("div", {className: "modal-body"}, 
                                    React.createElement(PickupForm, {
                                        pickRequester: this.props.pickRequester, 
                                        picker: this.props.picker, 
                                        onPickupSubmit: this.props.handlePickupSubmit, 
                                        modalID: modalID})
                                )
                            )
                        )
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-info", 
                        style: {float: 'right', marginRight: '10px'}}, 
                        React.createElement("i", {className: "glyphicon glyphicon-envelope"}), " " + ' ' +
                        "Message"
                    )
                )
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
            React.createElement("div", {className: "panel panel-primary fadein-effect"}, 
                React.createElement("div", {className: "panel-heading"}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {className: "img-circle box-shadow", 
                                     src: requester.profile.avatar ? requester.profile.avatar : getProfileDefaultPic(), 
                                     style: {width: '60px', height: '60px'}})
                            )
                        ), 
                        React.createElement("div", {className: "media-body "}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("p", {className: "media-heading col-md-12", 
                                   "data-toggle": "tooltip", 
                                   "data-placement": "left", 
                                   title: "Requester"}, 
                                    React.createElement("i", {className: "glyphicon glyphicon-user"}), 
                                    React.createElement("b", null, " ", requester.first_name, " ", requester.last_name), 
                                    " needs ", 
                                    pickType == 1 ?
                                        React.createElement("span", {className: "label label-success"}, "Flight") :
                                        React.createElement("span", {className: "label label-primary"}, "General"), 
                                    " pick up"
                                ), 
                                pickType == 1 ? 
                                React.createElement("div", null, 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Flight Number"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-plane"}), " ", start
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Arrival Time"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment_datetime.format("YYYY-MM-DD HH:mm")
                                    ), 
                                    React.createElement("p", {className: "col-md-12", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Destination"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", destination
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Pay"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", price
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Baggage Number"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-briefcase"}), " ", bags
                                    )
                                ) : React.createElement("div", null, 
                                    React.createElement("p", {className: "col-md-12", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Start"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-flag"}), " ", start
                                    ), 
                                    React.createElement("p", {className: "col-md-12", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Destination"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", destination
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Pay"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", price
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Pickup Time"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment_datetime.format("YYYY-MM-DD HH:mm")
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Round Trip"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-repeat"}), " ", round_trip
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       "data-toggle": "tooltip", 
                                       "data-placement": "left", 
                                       title: "Time Flexible"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-star"}), " ", time_flexible
                                    )
                                ), 
                                
                                React.createElement("p", {className: "col-md-12", 
                                   "data-toggle": "tooltip", 
                                   "data-placement": "left", 
                                   title: "Message"}, 
                                    React.createElement("i", {className: description ? "glyphicon glyphicon-comment" : ""}), " ", description
                                )
                            )
                        )
                    ), 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}}), 
                    this.getActionButton()
                )
            )
        );
    }
});
