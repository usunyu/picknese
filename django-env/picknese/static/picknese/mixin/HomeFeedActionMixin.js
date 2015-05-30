/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 *
 * React Parameters
 * --------------------------------------------------
 * @homeFeedActionMixinLoadHomeFeedInterval
 * @pollInterval
 */
var homeFeedCategory = "All";

var HomeFeedActionMixin = {
    loadHomeFeedFromServer: function() {
        $.ajax({
            url: getHomeFeedListAPI(university.id),
            dataType: 'json',
            success: function(data) {
                this.setState({feeds: data});
                dismissLoadingEffect();
                this.forceUpdate();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getHomeFeedListAPI(university.id), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            feeds: [],
        };
    },
    componentDidMount: function() {
        if (this.props.homeFeedActionMixinLoadHomeFeedInterval) {
            this.loadHomeFeedFromServer();
            setInterval(this.loadHomeFeedFromServer, this.props.pollInterval);
        }
    },
    handleFlightPickRequestSubmit: function(data) {
        $.ajax({
            url: getFlightPickRequestCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                window.location = getHomeFeedURL(data.university);
                preparePopupMessage(
                    "You have successfully post your request. Please waiting for your picker to contact you!",
                    "success"
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getFlightPickRequestCreateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickRequestCancel: function(data) {
        var id = data.id;
        $.ajax({
            url: getFlightPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage(
                    "You have successfully cancel your request.",
                    "success"
                );
                popupMessage();
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickRequestMutateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    handleFlightPickUpSubmit: function(data) {
        var id = data.flight_pick_request;
        $.ajax({
            url: getFlightPickUpCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage(
                    "Thanks for taking the request. Please contact the requester for confirmation!",
                    "success"
                );
                popupMessage();
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpCreateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    handlePickRequestSubmit: function(data) {
        $.ajax({
            url: getPickRequestCreateAPI(),
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                window.location = getHomeFeedURL(data.university);
                preparePopupMessage(
                    "You have successfully post your request. Please waiting for your picker to contact you!",
                    "success"
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPickRequestCreateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    handlePickRequestCancel: function(data) {
        var id = data.id;
        $.ajax({
            url: getPickRequestMutateAPI(id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage(
                    "You have successfully cancel your request.",
                    "success"
                );
                popupMessage();
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickRequestMutateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
}