var PickRequester = React.createClass({
    render: function() {
        return (
            <div className="pickRequester">
                <h4 className="pickRequesterName">
                    {this.props.name}
                </h4>
                {this.props.children}
            </div>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var imgStyle = {
            width: '100px',
            height: '100px'
        };
        var requesters = this.props.requesters.map(function (requester) {
            return (
                <PickRequester name={requester.name}>
                    <p>{requester.requester.first_name}</p>
                    <p>{requester.requester.last_name}</p>
                    <img src={requester.requester.profile.avatar} style={imgStyle} />
                    <p>{requester.pick_type}</p>
                    <p>{requester.price}</p>
                    <p>{requester.flight}</p>
                    <p>{requester.destination}</p>
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
    <PickRequesterPanel url="api/" pollInterval={2000}/>,
    document.getElementById('content')
);