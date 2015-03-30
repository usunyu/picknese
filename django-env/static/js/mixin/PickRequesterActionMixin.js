/*
 * Parameters: pollInterval
 *             myList (optional) => indicate current user's list
 *             loadAll (optional) => indicate load all pick requests
 */
var PickRequesterActionMixin = {
	loadPickRequestersFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        var apiURL = getPickRequesterListAPI(universityID);
        if (this.props.myList) {
            if (this.props.loadAll) {
                apiURL = getMyAllPickRequestListAPI();
            } else {
                apiURL = getMyPickRequestListAPI(universityID);
            }
        }
        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                this.setState({requesters: data});
                dismissLoadingEffect();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(apiURL, status, err.toString());
            }.bind(this)
        });
    },
    handlePickRequesterSubmit: function(form, requester, university, modalID) {
        var requesterData = {
            requester : requester.id,
            university : university.id,
            pick_type : form.pick_type,
            price : form.price,
            start : form.start,
            bags : form.bags,
            date_time : form.date_time,
            round_trip : form.round_trip,
            time_flexible : form.time_flexible,
            destination : form.destination,
            description : form.description,
        };
        $.ajax({
            url: getPickRequesterCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: requesterData,
            success: function(data) {
                if (modalID) {
                    $('#' + modalID).modal('hide');
                }
                $('#pick-request-post').collapse('hide');
                // reload data
                this.loadPickRequestersFromServer();
                popupSuccessMessage("You have successfully post your request. Please waiting for your picker to contact you!");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterCreateAPI(), status, err.toString());
                popupDangerMessage("Oops, some errors happen, please try again later.")
            }.bind(this)
        });
    },
    handlePickRequesterCancel: function(requestID, modalID) {
        $.ajax({
            url: getPickRequesterMutateAPI(requestID),
            type: 'DELETE',
            success: function(data) {
                // close dialog on success
                if (modalID) {
                    $('#' + modalID).modal('hide');
                }
                // reload data
                this.loadPickRequestersFromServer();
                popupWarningMessage("You have successfully cancel your request.")
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequesterMutateAPI(requestID), status, err.toString());
                popupDangerMessage("Oops, some errors happen, please try again later.");
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