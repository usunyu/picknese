var LoadUniversityMixin = {
	loadUniversityFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getUniversityAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({university: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getUniversityAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadUniversityFromServer();
    },
};