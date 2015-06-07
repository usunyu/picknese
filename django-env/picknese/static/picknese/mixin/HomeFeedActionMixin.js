/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 *
 * React Parameters
 * --------------------------------------------------
 * @homeFeedActionMixinLoadHomeFeedInterval
 * @homeFeedActionMixinLoadProfileRequestFeed
 * @pollInterval
 */
var CURRENT_FEED_TYPE = ALL_POST;

var HomeFeedActionMixin = {
    loadHomeFeedFromServer: function() {
        $.ajax({
            url: getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                this.setState({feeds: data});
                dismissLoadingEffect();
                // this.forceUpdate();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            feedType: ALL_POST, // home
            feeds: [],          // home
            messages: [],       // profile
            requests: [],       // profile
            offers: [],         // profile
        };
    },
    componentDidMount: function() {
        if (this.props.homeFeedActionMixinLoadHomeFeedInterval) {
            this.loadHomeFeedFromServer();
            setInterval(this.loadHomeFeedFromServer, this.props.pollInterval);
        }
        if (this.props.homeFeedActionMixinLoadProfileRequestFeed) {
            this.loadProfileRequestFromServer();
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
    handleFlightPickRequestCancel: function(data, callback) {
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
                callback();
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
    handlePickRequestCancel: function(data, callback) {
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
                callback();
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
    handlePickUpSubmit: function(data) {
        var id = data.pick_request;
        $.ajax({
            url: getPickUpCreateAPI(),
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
                console.error(getPickUpCreateAPI(), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    loadProfileRequestFromServer: function() {
        $.ajax({
            url: getProfileRequestAPI(profile_user.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                this.setState({requests: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileRequestAPI(profile_user.id, CURRENT_FEED_TYPE), status, err.toString());
            }.bind(this)
        });
    },
}