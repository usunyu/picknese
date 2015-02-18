var LoadCurrentUserMixin = {
	loadCurrentUserFromServer: function() {
        $.ajax({
            url: getCurrentUserAPI(),
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getCurrentUserAPI(), status, err.toString());
            }.bind(this)
        });
    },
    loadCurrentUserPickUpRequestCountFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getCurrentUserPickCountAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({currentUserPickCount: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getCurrentUserAPI(), status, err.toString());
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
        this.loadCurrentUserPickUpRequestCountFromServer();
    },
};