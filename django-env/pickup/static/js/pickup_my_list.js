/*
 * Render: /pickup/mylist/1/
 */
var MyPickListPanel = React.createClass({
    mixins: [LoadCurrentUserMixin,
             LoadUniversityMixin,
             PickRequesterActionMixin,
             PickUpActionMixin],
    render: function() {
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        currentUserPickCount={this.state.currentUserPickCount}
                        university={this.state.university} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
                    <PickRequesterForm 
                        currentUser={this.state.currentUser}
                        university={this.state.university}
                        onPickRequesterSubmit={this.handlePickRequesterSubmit} />
                    <MyPickUpRequestPanel
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        pickups={this.state.pickups}
                        handlePickupSubmit={this.handlePickupSubmit}
                        handlePickRequesterCancel={this.handlePickRequesterCancel} />
                </div>
            </div>
        );
    }
});

React.render(
    <MyPickListPanel
        myList={true}
        loadCount={true}
        pollInterval={20000}/>,
    document.getElementById('content')
);