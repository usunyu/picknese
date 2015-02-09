var LoadCurrentUserMixin = {
	loadCurrentUserFromServer: function() {
        var currentUserURL="/accounts/api/me/";
        $.ajax({
            url: currentUserURL,
            dataType: 'json',
            success: function(data) {
                this.setState({currentUser: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(currentUserURL, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadCurrentUserFromServer();
    },
};