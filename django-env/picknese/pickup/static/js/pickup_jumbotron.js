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
                    style={{background: backgroundImg, minHeight: '150px'}} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-2" style={{marginTop: '-130px'}}>
                            <img
                                src={logoImg}
                                className="img-thumbnail img-responsive img-center"
                                style={{width: '150px'}} />
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