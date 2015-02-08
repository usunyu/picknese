var JumbotronPanel = React.createClass({
    loadUniversityFromServer: function() {
        var universityAPI = this.props.universityAPI + this.props.universityID + "/";
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
    getInitialState: function() {
        return {
            university: [],
        };
    },
    componentDidMount: function() {
        this.loadUniversityFromServer();
    },
    render: function() {
        var university = this.state.university;
        if (university.length == 0) {
            return (<div />);
        }
        var backgroundImg = 'url(/static/images/campus/' + university.shorthand + '/2.jpg)';
        var logoImg = '/static/images/logo/' + university.shorthand + '.jpg';
        var universityURL = "/universities/" + university.id + "/";
        var pathname = window.location.pathname;
        var pickupTabActive = false;
        var universityTabActive = false;
        if (pathname.search('/pickup/requesters/') != -1) {
            pickupTabActive = true;
        } else if (pathname.search('/universities/') != -1) {
            universityTabActive = true;
        }

        return (
            <div style={{marginTop: '10px'}}>
                <div
                    className="jumbotron box-shadow"
                    style={{background: backgroundImg, minHeight: '200px'}} >
                </div>

                <div className="container" style={{marginTop: '-140px'}} >
                    <div className="row">
                        <div className="col-xs-5 col-sm-3 col-md-3 col-lg-2">
                            <img
                                src={logoImg}
                                className="img-thumbnail img-responsive img-center box-shadow-light"
                                style={{width: '150px'}} />
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9 hidden-xs" style={{marginTop: '38px'}}>
                            <h3 className="color-white text-shadow">{university.name}</h3>
                        </div>
                        <div className="col-xs-6 visible-xs" style={{marginTop: '38px'}}>
                            <h6 className="color-white text-shadow">{university.name}</h6>
                        </div>
                        <div className="col-xs-12 col-md-10">
                            <ul className="nav nav-tabs">
                                <li role="presentation" className={universityTabActive ? "active" : null}>
                                    <a href={universityURL}>{university.shorthand.toUpperCase()}</a>
                                </li>
                                <li role="presentation" className={pickupTabActive ? "active" : null}>
                                    <a href="#">Pick Up</a>
                                </li>
                                <li role="presentation">
                                    <a href="#">Carpool</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <JumbotronPanel universityAPI="/universities/api/"
                    universityID={document.getElementById('hiddenParam').getAttribute('universityID')}/>,
    document.getElementById('jumbotron')
);