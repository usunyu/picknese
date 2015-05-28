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
            url: getFlightPickRequestMutateAPI(data.id),
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                $("#feed-" + id).modal('hide');
                preparePopupMessage(
                    "You have successfully cancel your request.",
                    "success"
                );
                popupMessage();
                // setTimeout(this.loadHomeFeedFromServer, 5000);
                this.loadHomeFeedFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                $("#feed-" + data.id).modal('hide');
                console.error(getFlightPickRequestMutateAPI(), status, err.toString());
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
}