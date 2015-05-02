/*
 * Render: /pickup/requesters/1/
 */
var PickupForm = React.createClass({displayName: "PickupForm",
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onPickupSubmit({
            picker : this.props.picker,
            description : this.refs.message.getDOMNode().value.trim(),
        }, this.props.pickRequester, this.props.modalID);
    },
    render: function() {
        var requester = this.props.pickRequester.requester;
        return (
            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("img", {
                    className: "img-circle box-shadow", 
                    src: requester.profile.avatar, 
                    style: {width: '90px', height: '90px', marginBottom: '15px'}}), 
                React.createElement("p", null, React.createElement("b", null, requester.first_name, " ", requester.last_name)), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", null, "Message"), 
                    React.createElement("textarea", {
                        className: "form-control", 
                        rows: "3", 
                        placeholder: "Thanks for your kindndess, leve a message?", 
                        ref: "message"}
                    )
                ), 
                React.createElement("div", {className: "modal-footer"}, 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-default", 
                        "data-dismiss": "modal"}, 
                        "Cancel"
                    ), 
                    React.createElement("button", {
                        type: "submit", 
                        className: "btn btn-primary"}, 
                        "Confirm"
                    )
                )
            )
        );
    }
});

var PickRequesterList = React.createClass({displayName: "PickRequesterList",
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                React.createElement(PickRequester, {
                    key: pickRequester.id, 
                    pickRequester: pickRequester, 
                    picker: this.props.currentUser, 
                    handlePickupSubmit: this.props.handlePickupSubmit, 
                    onPickRequesterCancel: this.props.handlePickRequesterCancel})
            );
        }
        return (
            React.createElement("div", null, 
                React.createElement(PickRequesterForm, {
                    currentUser: this.props.currentUser, 
                    university: this.props.university, 
                    onPickRequesterSubmit: this.props.handlePickRequesterSubmit}), 
                pickRequesters
            )
        );
    }
});

var PickRecord = React.createClass({displayName: "PickRecord",
    render: function() {
        return (
            React.createElement("li", {className: "feed-item"}, 
                React.createElement("time", {className: "date", dateTime: this.props.date_time}, this.props.date_time), 
                React.createElement("span", {className: "text"}, 
                    React.createElement("a", {href: "#"}, this.props.picker.first_name, " ", this.props.picker.last_name), 
                    " will pick up ", 
                    React.createElement("a", {href: "#"}, this.props.pickee.first_name, " ", this.props.pickee.last_name)
                )
            )
        );
    }
});

var PickRecordList = React.createClass({displayName: "PickRecordList",
    render: function() {
        var pickRecords = [];
        for (var i = 0; i < this.props.pickups.length; i++) {
            var pickup = this.props.pickups[i];
            var moment_datetime = moment(pickup.date_time, "YYYY-MM-DD HH:mm");
            pickRecords.push(
                React.createElement(PickRecord, {
                    key: pickup.id, 
                    pickee: pickup.pickee, 
                    picker: pickup.picker, 
                    date_time: moment_datetime.format("YYYY-MM-DD")})
            );
        }
        return (
            React.createElement("ol", {className: "activity-feed"}, 
                pickRecords
            )
        );
    }
});

var PickRequesterPanel = React.createClass({displayName: "PickRequesterPanel",
    mixins: [LoadCurrentUserMixin,
             LoadUniversityMixin,
             PickRequesterActionMixin,
             PickUpActionMixin],
    render: function() {
        if (this.state.university && this.state.currentUser && this.state.currentUserPickCount && production) {
            var pickRequestEvent = {
                university: this.state.university.name,
                referrer: document.referrer,
                keen: {
                    timestamp: new Date().toISOString()
                }
            };
            keen_client.addEvent("pickup_requester_list", pickRequestEvent, function(err, res){
                if (err) {
                    // there was an error!
                    // console.log('pickup_requester_list event keen logging error');
                } else {
                    // see sample response below
                    // console.log('pickup_requester_list event keen logging success');
                }
            });
        }
        return (
            React.createElement("div", {className: "row col-xs-12 col-sm-12 col-md-12 col-lg-12", 
                 style: {marginTop: '10px'}}, 
                React.createElement("div", {className: "col-xs-12 col-sm-4 col-md-3 fadein-effect"}, 
                    React.createElement(CurrentUserPanel, {
                        currentUser: this.state.currentUser, 
                        currentUserPickCount: this.state.currentUserPickCount, 
                        university: this.state.university}), 
                    React.createElement("div", {className: "col-xs-12 col-sm-12 hidden-md hidden-lg"}, 
                        React.createElement(PickRequesterFormCollapseButton, null)
                    )
                ), 
                React.createElement("div", {className: "col-xs-12 col-sm-8 col-md-7"}, 
                    React.createElement(PickRequesterList, {
                        currentUser: this.state.currentUser, 
                        requesters: this.state.requesters, 
                        university: this.state.university, 
                        handlePickupSubmit: this.handlePickupSubmit, 
                        handlePickRequesterSubmit: this.handlePickRequesterSubmit, 
                        handlePickRequesterCancel: this.handlePickRequesterCancel})
                ), 
                React.createElement("div", {className: "col-md-2 hidden-xs hidden-sm sidebar-offcanvas fadein-effect"}, 
                    React.createElement(PickRequesterFormCollapseButton, null), 
                    React.createElement(PickRecordList, {
                        pickups: this.state.pickups})
                )
            )
        );
    }
});

React.render(
    React.createElement(PickRequesterPanel, {
        loadCount: true, 
        pollInterval: 20000}),
    document.getElementById('content')
);