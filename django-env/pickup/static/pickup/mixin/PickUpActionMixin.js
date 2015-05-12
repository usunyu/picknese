/*
 * Parameters: pollInterval
 *             myList (optional) => indicate current user's list
 *             loadAll (optional) => indicate load all pick ups
 */
var PickUpActionMixin = {
	loadPickUpsFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        var apiURL = getPickUpListAPI(universityID);
        if (this.props.myList) {
            if (this.props.loadAll) {
                apiURL = getMyAllPickUpListAPI();
            } else {
                apiURL = getMyPickUpListAPI(universityID);
            }
        }
        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                this.setState({pickups: data});
                dismissLoadingEffect();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(apiURL, status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(pickup, requester, modalID) {
        // Create PickUp
        var pickupData = {
            picker : pickup.picker.id,
            pickee : requester.requester.id,
            university : requester.university.id,
            pick_type : requester.pick_type,
            start : requester.start,
            price : requester.price,
            destination : requester.destination,
            description : pickup.description,
            date_time : requester.date_time,
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

        // Delete PickRequester Record
        $.ajax({
            url: getPickRequesterMutateAPI(requester.id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                // close dialog on success
                $('#' + modalID).modal('hide');
                // try reload data
                if (this.loadPickRequestersFromServer) {
                    this.loadPickRequestersFromServer();
                } else {
                    console.error("Try load PickRequesters in improper state.");
                }
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