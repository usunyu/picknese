/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 */
var ERROR_MESSAGE = "Oops, some errors happen, please try again later.";

var ProfileActionMixin = {
	handleProfileInfoUpdate: function(data, callback) {
        // user update profile info request
        $.ajax({
            url: getProfileInfoUpdateAPI(),
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function(data) {
                preparePopupMessage("You have successfully update your profile.", "success");
                popupMessage();
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileInfoUpdateAPI(), status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
                callback();
            }.bind(this)
        });
    },
}