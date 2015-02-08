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
                <div className="col-xs-12 col-sm-4 col-md-3">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
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