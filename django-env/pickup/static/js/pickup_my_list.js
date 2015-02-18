var MyPickListPanel = React.createClass({
    mixins: [LoadCurrentUserMixin,
             LoadUniversityMixin,
             MyPickRequestActionMixin],
    render: function() {
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        university={this.state.university} />
                </div>
            </div>
        );
    }
});

React.render(
    <MyPickListPanel
        pollInterval={20000}/>,
    document.getElementById('content')
);