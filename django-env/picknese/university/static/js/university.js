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
                                src={avatar ? avatar : '/media/images/avatar/default_pic.png'}
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
    loadUniversityFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        var universityAPI = this.props.universityAPI + universityID + "/";
        $.ajax({
            url: universityAPI,
            dataType: 'json',
            success: function(data) {
                this.setState({university: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(universityAPI, status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserFromServer: function() {
        $.ajax({
            url: this.props.currentUserURL,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.currentUserURL, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            university: [],
            currentUser: null,
        };
    },
    componentDidMount: function() {
        this.loadUniversityFromServer();
        this.loadCurrentUserFromServer();
    },
    render: function() {
        var university = this.state.university;
        if (university.length == 0) {
            return (<div />);
        }
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7 fadein-effect">
                    <p><b>Description:</b> &nbsp;{university.description}</p>
                    <p><b>Address:</b> &nbsp;{university.address}</p>
                    <p><b>State:</b> &nbsp;{university.state}</p>
                    <p><b>Country:</b> &nbsp;{university.country}</p>
                </div>
            </div>
        );
    }
});

React.render(
    <UniversityPanel 
        universityAPI="/universities/api/"
        currentUserURL="/accounts/api/me/" />,
    document.getElementById('content')
);