var LoadUniversityMixin = {
	loadUniversityFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        var universityURL = "/universities/api/" + universityID + "/";
        $.ajax({
            url: universityURL,
            dataType: 'json',
            success: function(data) {
                this.setState({university: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(universityURL, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadUniversityFromServer();
    },
};