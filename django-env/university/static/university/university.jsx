var UniversityPanel = React.createClass({
    mixins: [LoadCurrentUserMixin, 
             LoadUniversityMixin],
    render: function() {
        var university = this.state.university;
        if (!university) {
            return (<div />);
        }
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        university={this.state.university} />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-9 fadein-effect">
                    <p><b>University:</b> &nbsp;{university.name}</p>
                    <p><b>Description:</b> &nbsp;{university.description}</p>
                    <p><b>Address:</b> &nbsp;{university.address}, &nbsp;{university.state}, &nbsp;{university.country}</p>
                    <hr className="col-xs-12 col-sm-12 col-md-12" />
                </div>
                <div id="map-canvas"></div>
            </div>
        );
    }
});

React.render(
    <UniversityPanel />,
    document.getElementById('content')
);