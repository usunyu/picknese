// Required:
// Set: pollInterval
// Dependency: PickRequesterActionMixin
var PickUpActionMixin = {
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
                popupSuccessMessage("Thanks, you have successfully offer your pick, please contact your requester.");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requester.id), status, err.toString());
                popupDangerMessage("Oops, some errors happen, please try again later.")
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            pickups: [],
        };
    },
    componentDidMount: function() {
        this.loadPickUpsFromServer();
        setInterval(this.loadPickUpsFromServer, this.props.pollInterval);
    },
};