/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 *
 * React Parameters
 * --------------------------------------------------
 * @feedActionMixinLoadHomeFeedInterval
 * @pollInterval
 */
var CURRENT_FEED_TYPE = ALL_POST;
var ERROR_MESSAGE = "Oops, some errors happen, please try again later.";

var FeedActionMixin = {
    loadHomeFeedFromServer: function() {
        // load home feed for home.jsx
        $.ajax({
            url: getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                FIRST_LOAD_HOME_FEED_FINISH = true;
                this.setState({feeds: data});
                // this.forceUpdate();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            feedType: ALL_POST,
            feeds: [],
        };
    },
    componentDidMount: function() {
        if (this.props.feedActionMixinLoadHomeFeedInterval) {
            this.loadHomeFeedFromServer();
            setInterval(this.loadHomeFeedFromServer, this.props.pollInterval);
        }
    },
    handleFlightPickRequestSubmit: function(data) {
        // requester post flight pick request
        $.ajax({
            url: getFlightPickRequestCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                window.location = getHomeFeedURL(data.university);
                preparePopupMessage("You have successfully post your request. Please waiting for your picker to contact you!", "success");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getFlightPickRequestCreateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickRequestUpdate: function(data, callback) {
        // requester update flight pick request
        var id = data.id;
        var feed_type = data.feed_type;
        $.ajax({
            url: getFlightPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function(data) {
                $("#update-modal-" + feed_type + "-" + id).modal('hide');
                preparePopupMessage("You have successfully update your request.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#update-modal-" + feed_type + "-" + id).modal('hide');
                console.error(getFlightPickRequestMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickRequestCancel: function(data, callback) {
        // requester cancel flight pick request
        var id = data.id;
        $.ajax({
            url: getFlightPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully cancel your request.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickRequestMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickUpSubmit: function(data) {
        // picker provide flight pick up
        var id = data.flight_pick_request;
        $.ajax({
            url: getFlightPickUpCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("Thanks for taking the request. Please contact the requester for confirmation!", "success");
                popupMessage();
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpCreateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickUpReject: function(data, callback) {
        // requester reject the flight pick up offer
        var id = data.id;
        $.ajax({
            url: getFlightPickUpMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully reject this offer.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickUpCancel: function(data, callback) {
        // picker cancel the flight pick up offer
        var id = data.id;
        $.ajax({
            url: getFlightPickUpMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully cancel your offer.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickRequestSubmit: function(data) {
        // requester post pick request
        $.ajax({
            url: getPickRequestCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                window.location = getHomeFeedURL(data.university);
                preparePopupMessage("You have successfully post your request. Please waiting for your picker to contact you!", "success");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequestCreateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickRequestUpdate: function(data, callback) {
        // requester update pick request
        var id = data.id;
        var feed_type = data.feed_type;
        $.ajax({
            url: getPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function(data) {
                $("#update-modal-" + feed_type + "-" + id).modal('hide');
                preparePopupMessage("You have successfully update your request.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#update-modal-" + feed_type + "-" + id).modal('hide');
                console.error(getPickRequestMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickRequestCancel: function(data, callback) {
        // requester cancel pick request
        var id = data.id;
        $.ajax({
            url: getPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully cancel your request.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickRequestMutateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickUpSubmit: function(data) {
        // picker provide pick up
        var id = data.pick_request;
        $.ajax({
            url: getPickUpCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("Thanks for taking the request. Please contact the requester for confirmation!", "success");
                popupMessage();
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickUpCreateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickUpReject: function(data, callback) {
        // requester reject the pick up offer
        var id = data.id;
        $.ajax({
            url: getPickUpMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully reject this offer.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handlePickUpCancel: function(data, callback) {
        // picker cancel the pick up offer
        var id = data.id;
        $.ajax({
            url: getPickUpMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage("You have successfully cancel this offer.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
}