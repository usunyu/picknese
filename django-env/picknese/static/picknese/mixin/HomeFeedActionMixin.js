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
        // load home feed for home.jsx
        $.ajax({
            url: getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                FIRST_LOAD_HOME_FEED_FINISH = true;
                this.setState({feeds: data});
                // dismissLoadingEffect();
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
        // requester post flight pick request
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
        // requester cancel flight pick request
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
        // picker provide flight pick up
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
                preparePopupMessage(
                    "You have successfully reject this offer.",
                    "success"
                );
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
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
                preparePopupMessage(
                    "You have successfully cancel your offer.",
                    "success"
                );
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getFlightPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
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
        // requester cancel pick request
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
        // picker provide pick up
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
                preparePopupMessage(
                    "You have successfully reject this offer.",
                    "success"
                );
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
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
                preparePopupMessage(
                    "You have successfully cancel this offer.",
                    "success"
                );
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + id).modal('hide');
                console.error(getPickUpMutateAPI(id), status, err.toString());
                preparePopupMessage(
                    "Oops, some errors happen, please try again later.",
                    "danger"
                );
                popupMessage();
            }.bind(this)
        });
    },
    loadProfileRequestFromServer: function() {
        // load profile request feed for me.jsx
        $.ajax({
            url: getProfileRequestAPI(profile_user.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                FIRST_LOAD_PROFILE_REQUEST_FEED_FINISH = true;
                this.setState({requests: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileRequestAPI(profile_user.id, CURRENT_FEED_TYPE), status, err.toString());
            }.bind(this)
        });
    },
    loadProfileOfferFromServer: function() {
        // load profile offer feed for me.jsx
        $.ajax({
            url: getProfileOfferAPI(profile_user.id, CURRENT_FEED_TYPE),
            dataType: 'json',
            success: function(data) {
                FIRST_LOAD_PROFILE_OFFER_FEED_FINISH = true;
                this.setState({offers: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileOfferAPI(profile_user.id, CURRENT_FEED_TYPE), status, err.toString());
            }.bind(this)
        });
    },
}