/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 *
 * React Parameters
 * --------------------------------------------------
 * @pollInterval
 */
var homeFeedCategory = "All";

var HomeFeedActionMixin = {
    loadHomeFeedFromServer: function() {
        var apiURL = getHomeFeedListAPI(university.id);
        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                this.setState({feeds: data});
                dismissLoadingEffect();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(apiURL, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            feeds: [],
        };
    },
    componentDidMount: function() {
        this.loadHomeFeedFromServer();
        setInterval(this.loadHomeFeedFromServer, this.props.pollInterval);
    },
}