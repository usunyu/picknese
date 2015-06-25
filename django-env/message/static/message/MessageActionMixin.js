
var MessageActionMixin = {
	loadMessageFromServer: function() {
        // $.ajax({
        //     url: getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE),
        //     dataType: 'json',
        //     success: function(data) {
        //         FIRST_LOAD_HOME_FEED_FINISH = true;
        //         this.setState({feeds: data});
        //         // this.forceUpdate();
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(getHomeFeedListAPI(university.id, CURRENT_FEED_TYPE), status, err.toString());
        //     }.bind(this)
        // });
    },
    getInitialState: function() {
        return {
            messages: [],
        };
    },
}