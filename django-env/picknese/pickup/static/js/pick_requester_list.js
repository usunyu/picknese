var PickRequester = React.createClass({
    render: function() {
        return (
            <div className="col-sm-6 col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <img 
                            className="img-circle box-shadow"
                            src={this.props.avatar}
                            style={{width: '100px', height: '100px'}} />
                    </div>
                    <div className="panel-body">
                        <p>
                            <i className="glyphicon glyphicon-user"></i> 
                            <b>{this.props.first_name} {this.props.last_name}</b> is requesting pick up
                        </p>
                        <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.destination}</p>
                        <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.price}</p>
                        <p><i className="glyphicon glyphicon-comment"></i> {this.props.description}</p>
                    </div>
                </div>
            </div>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var pickRequesters = this.props.requesters.map(function (pickRequester) {
            return (
                <PickRequester
                    username={pickRequester.requester.username}
                    first_name={pickRequester.requester.first_name}
                    last_name={pickRequester.requester.last_name}
                    email={pickRequester.requester.email}
                    avatar={pickRequester.requester.profile.avatar}
                    pick_type={pickRequester.pick_type}
                    price={pickRequester.price}
                    flight={pickRequester.flight}
                    destination={pickRequester.destination}
                    confirmed={pickRequester.confirmed}
                    description={pickRequester.description} />
            );
        });
        return (
            <div className="row">
                {pickRequesters}
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
            <div className="col-xs-12 col-md-9">
                <PickRequesterList
                    className="col-xs-12 col-md-9"
                    requesters={this.state.requesters} />
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel url="api/" pollInterval={2000}/>,
    document.getElementById('content')
);