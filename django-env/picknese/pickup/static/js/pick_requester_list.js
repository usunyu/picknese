var PickRequester = React.createClass({
    render: function() {
        return (
            <div className="pickRequester">
            //     <h4 className="universityName">
            //         {this.props.name}
            //     </h4>
            //     {this.props.children}
            </div>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var requesters = this.props.requesters.map(function (requester) {
            return (
                <PickRequester name={requester.name}>
                    // <p>{university.shorthand}</p>
                    // <p>{university.url}</p>
                    // <p>{university.description}</p>
                </PickRequester>
            );
        });
        return (
            <div className="pickRequesterList">
                {requesters}
            </div>
        );
    }
});

var PickRequesterPanel = React.createClass({
    loadPickRequestersFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // handlePickRequesterSubmit: function(university) {
    //     $.ajax({
    //         url: this.props.url,
    //         dataType: 'json',
    //         type: 'POST',
    //         data: university,
    //         success: function(data) {
    //             universities = this.state.data;
    //             universities.push(data);
    //             this.setState({data: universities});
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
    // },
    getInitialState: function() {
        return {
            requesters: [],
        };
    },
    componentDidMount: function() {
        this.loadPickRequestersFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="pickRequesterPanel">
                <PickRequesterList requesters={this.state.requesters} />
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel url="api/" pollInterval={20000}/>,
    document.getElementById('content')
);