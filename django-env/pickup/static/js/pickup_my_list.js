var MyPickListPanel = React.createClass({
    mixins: [LoadCurrentUserMixin, 
             LoadUniversityMixin],
    loadPickRequestersFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getPickRequesterListAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterListAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    loadPickUpsFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getPickUpListAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickUpListAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(pickup, requester, modalID) {
        // Create PickUp
        var pickupData = {
            picker : pickup.picker.id,
            pickee : pickup.pickee.id,
            university : pickup.university.id,
            pickType : pickup.pickType,
            start : pickup.start,
            flight : pickup.flight,
            price : pickup.price,
            destination : pickup.destination,
            description : pickup.description,
        };
        $.ajax({
            url: getPickUpCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: pickupData,
            success: function(data) {
                // reload data
                this.loadPickUpsFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickUpCreateAPI(), status, err.toString());
            }.bind(this)
        });
        // Update PickRequester confirmed field
        var pickRequesterData = {
            id : requester.id,
            pick_type : requester.pick_type,
            price : requester.price,
            flight : requester.flight,
            destination : requester.destination,
            confirmed : true,
            description : requester.description,
            requester : requester.requester.id,
            university : requester.university.id,
        };
        $.ajax({
            url: getPickRequesterMutateAPI(requester.id),
            dataType: 'json',
            type: 'PUT',
            data: pickRequesterData,
            success: function(data) {
                // close dialog on success
                $('#' + modalID).modal('hide');
                // reload data
                this.loadPickRequestersFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requester.id), status, err.toString());
            }.bind(this)
        });
    },
    handlePickRequesterCancel: function(requestID, modalID) {
        $.ajax({
            url: getPickRequesterMutateAPI(requestID),
            type: 'DELETE',
            success: function(data) {
                // close dialog on success
                $('#' + modalID).modal('hide');
                // reload data
                this.loadPickRequestersFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requestID), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            requesters: [],
            pickups: [],
            currentUser: null,
            university: null,
        };
    },
    componentDidMount: function() {
        this.loadPickRequestersFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);

        this.loadPickUpsFromServer();
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        university={this.state.university} />
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
                    <PickRequesterList
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        university={this.state.university}
                        handlePickupSubmit={this.handlePickupSubmit}
                        handlePickRequesterSubmit={this.handlePickRequesterSubmit}
                        handlePickRequesterCancel={this.handlePickRequesterCancel} />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-2 sidebar-offcanvas fadein-effect">
                    <PickRecordList
                        pickups={this.state.pickups} />
                </div>
            </div>
        );
    }
});

React.render(
    <MyPickListPanel
        pollInterval={20000}/>,
    document.getElementById('content')
);