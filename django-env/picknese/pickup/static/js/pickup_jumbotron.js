var JumbotronPanel = React.createClass({
    loadUniversityFromServer: function() {
        university_url = this.props.url;
        university_id = document.getElementById('jumbotron').getAttribute('university_id');
        university_url += university_id;
        $.ajax({
            url: university_url,
            dataType: 'json',
            success: function(data) {
                this.setState({university: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(university_url, status, err.toString());
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
        university = this.state.university;
        if (university.length == 0) {
            return (<div />);
        }
        backgroundImg = 'url(/static/images/campus/' + university.shorthand + '/2.jpg)';
        logoImg = '/static/images/logo/' + university.shorthand + '.jpg';
        return (
            <div>
                <div
                    className="jumbotron"
                    style={{background: backgroundImg, minHeight: '160px'}} >
                </div>

                <div className="container" style={{marginTop: '-140px'}} >
                    <div className="row">
                        <div className="col-xs-5 col-sm-3 col-md-3 col-lg-2">
                            <img
                                src={logoImg}
                                className="img-thumbnail img-responsive img-center"
                                style={{width: '150px'}} />
                        </div>
                        <div className="col-sm-9 col-md-9 col-lg-9 hidden-xs" style={{marginTop: '38px'}}>
                            <h3 className="color-white text-shadow">{university.name}</h3>
                        </div>
                        <div className="col-xs-6 visible-xs" style={{marginTop: '38px'}}>
                            <p className="color-white text-shadow"><b>{university.name}</b></p>
                        </div>
                        <div className="col-xs-12 col-md-10">
                            <ul className="nav nav-tabs">
                              <li role="presentation"><a href="#">USC</a></li>
                              <li role="presentation"><a href="#">Me</a></li>
                              <li role="presentation" className="active"><a href="#">Pick Up</a></li>
                              <li role="presentation"><a href="#">Carpool</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <JumbotronPanel url="/universities/api/"/>,
    document.getElementById('jumbotron')
);