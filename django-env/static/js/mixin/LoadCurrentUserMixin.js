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
    componentDidMount: function() {
        this.loadCurrentUserFromServer();
    },
};