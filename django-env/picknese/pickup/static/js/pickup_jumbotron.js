var JumbotronPanel = React.createClass({
    loadUniversityFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({university: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
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

        console.log(university);
        return (
            <div>
                <div
                    className="jumbotron"
                    style={{background: 'url(/static/images/campus/usc/2.jpg)', minHeight: '150px'}} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4" style={{marginTop: '-130px'}}>
                            <img src="/static/images/logo/usc.jpg" alt="" className="img-thumbnail img-responsive img-center" style={{width: '150px'}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


React.render(
    <JumbotronPanel url="/universities/api/1/"/>,
    document.getElementById('jumbotron')
);