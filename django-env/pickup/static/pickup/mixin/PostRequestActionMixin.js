
var PostRequestActionMixin = {
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
}