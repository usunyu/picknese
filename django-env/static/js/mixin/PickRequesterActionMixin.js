// Required:
// Set: pollInterval
var PickRequesterActionMixin = {
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
    handlePickRequesterSubmit: function(form, requester, university) {
        var destination = form.destination;
        if (!destination) {
            // TODO, show error message
            alert('Please input destination');
            return;
        }
        var requesterData = {
            requester : requester.id,
            university : university.id,
            pick_type : form.pick_type,
            price : form.price,
            confirmed: false,
            flight : form.flight,
            start : form.start,
            destination : form.destination,
            description : form.description,
        }
        var pickRequester = {
            requester : requester,
            university : university,
            pick_type : form.pick_type,
            price : form.price,
            confirmed: false,
            flight : form.flight,
            destination : form.destination,
            description : form.description,
        }
        $.ajax({
            url: getPickRequesterCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: requesterData,
            success: function(data) {
                // reload data
                this.loadPickRequestersFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterCreateAPI(), status, err.toString());
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
        };
    },
    componentDidMount: function() {
        this.loadPickRequestersFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);
    },
};