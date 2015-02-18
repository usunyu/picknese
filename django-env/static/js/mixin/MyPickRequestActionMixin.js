// Required:
// Set: pollInterval
var MyPickRequestActionMixin = {
    loadMyPickupsFromServer: function() {
        var universityID = parseLastNumberInURLPath();
        $.ajax({
            url: getMyPickRequestListAPI(universityID),
            dataType: 'json',
            success: function(data) {
                this.setState({myRequests: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getMyPickRequestListAPI(universityID), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            myRequests: [],
        };
    },
    componentDidMount: function() {
        this.loadMyPickupsFromServer();
        setInterval(this.loadPickRequestersFromServer, this.props.pollInterval);
    },
};