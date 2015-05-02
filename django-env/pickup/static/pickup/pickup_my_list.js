/*
 * Render: /pickup/mylist/1/
 */
var MyPickListPanel = React.createClass({displayName: "MyPickListPanel",
    mixins: [LoadCurrentUserMixin,
             LoadUniversityMixin,
             PickRequesterActionMixin,
             PickUpActionMixin],
    render: function() {
        return (
            React.createElement("div", {className: "row col-md-12", 
                 style: {marginTop: '10px'}}, 
                React.createElement("div", {className: "col-xs-12 col-sm-4 col-md-3 fadein-effect"}, 
                    React.createElement(CurrentUserPanel, {
                        currentUser: this.state.currentUser, 
                        currentUserPickCount: this.state.currentUserPickCount, 
                        university: this.state.university})
                ), 
                React.createElement("div", {className: "col-xs-12 col-sm-8 col-md-7"}, 
                    React.createElement(PickRequesterForm, {
                        currentUser: this.state.currentUser, 
                        university: this.state.university, 
                        onPickRequesterSubmit: this.handlePickRequesterSubmit}), 
                    React.createElement(MyPickUpRequestPanel, {
                        currentUser: this.state.currentUser, 
                        requesters: this.state.requesters, 
                        pickups: this.state.pickups, 
                        handlePickupSubmit: this.handlePickupSubmit, 
                        handlePickRequesterCancel: this.handlePickRequesterCancel})
                )
            )
        );
    }
});

React.render(
    React.createElement(MyPickListPanel, {
        myList: true, 
        loadCount: true, 
        pollInterval: 20000}),
    document.getElementById('content')
);