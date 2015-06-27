/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 */
var ERROR_MESSAGE = "Oops, some errors happen, please try again later.";

var ProfileActionMixin = {
	handleProfileInfoUpdate: function(data) {
        // user update profile info request
        $.ajax({
            url: getProfileInfoUpdateAPI(),
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function(data) {
                preparePopupMessage("You have successfully update your profile.", "success");
                popupMessage();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileInfoUpdateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            requests: [],
            offers: [],
        };
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