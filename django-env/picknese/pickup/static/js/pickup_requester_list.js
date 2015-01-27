var PickRequester = React.createClass({
    render: function() {
        return (
            <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                        <img
                            className="img-circle box-shadow"
                            src={this.props.avatar}
                            style={{width: '120px', height: '120px', marginBottom: '15px'}} />
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-10 col-lg-10">
                        <p>
                            <i className="glyphicon glyphicon-user"></i>
                            <b> {this.props.first_name} {this.props.last_name}</b>
                            &nbsp;needs a&nbsp;
                            {this.props.pick_type == 1 ?
                                <span className="label label-success">Flight</span> :
                                <span className="label label-primary">General</span>}
                            &nbsp;pick up
                        </p>
                        <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.destination}</p>
                        <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.price}</p>
                        <p><i className="glyphicon glyphicon-comment"></i> {this.props.description}</p>
                        <hr />
                    </div>

                    <button
                        type="button"
                        className="btn btn-default"
                        data-toggle="modal"
                        data-target="#test_XXX"
                        style={{float: 'right'}}>
                        Offer Your Pick Up
                    </button>
                    <div
                        className="modal fade" id="test_XXX" tabIndex="-1"
                        role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" id="modalLabel">
                                        Offer Pick Up
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
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
        }
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
            <div>
                <div className="col-xs-12 col-sm-9">
                    <PickRequesterList
                        requesters={this.state.requesters} />
                </div>
                <div className="hidden-xs col-sm-3 sidebar-offcanvas">
                </div>
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel url="api/" pollInterval={20000}/>,
    document.getElementById('content')
);