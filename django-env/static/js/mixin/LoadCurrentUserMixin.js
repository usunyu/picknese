/*
 * Parameters: loadCount (optional) => indicate load pick up count
 *             loadAll (optional) => indicate load all pick up, not specific university
 */
var LoadCurrentUserMixin = {
	loadCurrentUserFromServer: function() {
        $.ajax({
            url: getCurrentUserAPI(),
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
                dismissLoadingEffect();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getCurrentUserAPI(), status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserPickUpRequestCountFromServer: function() {
        var apiURL = null;
        if (this.props.loadAll) {
            apiURL = getCurrentUserAllPickCountAPI();
        } else {
            var universityID = parseLastNumberInURLPath();
            apiURL = getCurrentUserPickCountAPI(universityID);
        }
        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUserPickCount: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(apiURL, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            currentUser: null,
            currentUserPickCount: null,
        };
    },
    componentDidMount: function() {
        this.loadCurrentUserFromServer();
        if (this.props.loadCount) {
            this.loadCurrentUserPickUpRequestCountFromServer();
        }
    },
};