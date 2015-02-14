var CurrentUserPanel = React.createClass({
    render: function() {
        if (!this.props.currentUser || !this.props.currentUser.id) {
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <hr />
                        <p>Hello World</p>
                    </div>
                    <hr />
                </div>
            );
        }
        var currentUser = this.props.currentUser;
        var avatar = currentUser.profile.avatar;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <img
                                className="img-circle box-shadow"
                                src={avatar ? avatar : '/media/default_pic.png'}
                                style={{width: '100px', height: '100px'}} />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <p style={{marginTop: '10px', marginBottom: '-10px'}}>
                                <b>{currentUser.first_name} {currentUser.last_name}</b>
                            </p>
                            <hr />
                            <p style={{marginTop: '-10px'}}>
                                <a href="#">Edit Profile</a>
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
                <hr />
            </div>
        );
    }
});

var UniversityPanel = React.createClass({
    mixins: [LoadCurrentUserMixin, 
             LoadUniversityMixin],
    getInitialState: function() {
        return {
            university: null,
            currentUser: null,
        };
    },
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
                        currentUser={this.state.currentUser} />
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