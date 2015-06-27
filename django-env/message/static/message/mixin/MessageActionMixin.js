/*
 * Template Parameters
 * --------------------------------------------------
 *
 * React Parameters
 * --------------------------------------------------
 */
var MessageActionMixin = {
	loadMessageListFromServer: function() {
        $.ajax({
            url: getMessageListAPI(),
            dataType: 'json',
            success: function(data) {
                this.setState({messages: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getMessageListAPI(), status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            messages: [],
        };
    },
}