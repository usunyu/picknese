/*
 * Parameters: pickup
 */
var PickUp = React.createClass({displayName: "PickUp",
    render: function() {
        var picker = this.props.pickup.picker;
        var pickee = this.props.pickup.pickee;
        var pickType = this.props.pickup.pick_type;
        var moment_datetime = moment(this.props.pickup.date_time, "YYYY-MM-DD HH:mm");
        return (
            React.createElement("div", {className: "panel panel-success fadein-effect"}, 
                React.createElement("div", {className: "panel-heading"}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {className: "img-circle box-shadow", 
                                     src: picker.profile.avatar ? picker.profile.avatar : getProfileDefaultPic(), 
                                     style: {width: '50px', height: '50px'}})
                            ), 
                            React.createElement("hr", {className: "invisible-hr"}), 
                            React.createElement("div", {className: "text-center"}, 
                                React.createElement("i", {className: "glyphicon glyphicon-ok-sign"})
                            ), 
                            React.createElement("hr", {className: "invisible-hr"}), 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {className: "img-circle box-shadow", 
                                     src: pickee.profile.avatar ? pickee.profile.avatar : getProfileDefaultPic(), 
                                     style: {width: '50px', height: '50px'}})
                            )
                        ), 
                        React.createElement("div", {className: "media-body"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("p", {className: "media-heading col-md-12"}, 
                                    React.createElement("i", {className: "glyphicon glyphicon-user"}), 
                                    React.createElement("b", null, " ", picker.first_name, " ", picker.last_name), 
                                    " will offer ", 
                                    React.createElement("b", null, " ", pickee.first_name, " ", pickee.last_name), 
                                    " a ", 
                                    pickType == 1 ?
                                        React.createElement("span", {className: "label label-success"}, "Flight") :
                                        React.createElement("span", {className: "label label-primary"}, "General"), 
                                    " pick up"
                                ), 
                                pickType == 1 ?
                                React.createElement("div", null, 
                                    React.createElement("p", {className: "col-md-5"}, React.createElement("i", {className: "glyphicon glyphicon-plane"}), " ", this.props.pickup.start), 
                                    React.createElement("p", {className: "col-md-5"}, React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment_datetime.format("YYYY-MM-DD HH:mm")), 
                                    React.createElement("p", {className: "col-md-12"}, React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", this.props.pickup.destination), 
                                    React.createElement("p", {className: "col-md-5"}, React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", this.props.pickup.price)
                                ) : React.createElement("div", null, 
                                    React.createElement("p", {className: "col-md-12"}, React.createElement("i", {className: "glyphicon glyphicon-flag"}), " ", this.props.pickup.start), 
                                    React.createElement("p", {className: "col-md-12"}, React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", this.props.pickup.destination), 
                                    React.createElement("p", {className: "col-md-5"}, React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment_datetime.format("YYYY-MM-DD HH:mm")), 
                                    React.createElement("p", {className: "col-md-5"}, React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", this.props.pickup.price)
                                )
                                
                            )
                        )
                    )
                )
            )
        );
    }
});