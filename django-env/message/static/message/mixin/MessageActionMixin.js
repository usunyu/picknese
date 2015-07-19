/*
 * Template Parameters
 * --------------------------------------------------
 *
 * React Parameters
 * --------------------------------------------------
 * @messageActionMixinLoadMessageList
 */
var RECEIVED_MESSAGE    = 1;
var SENT_MESSAGE        = 2;

var FIRST_LOAD_MESSAGE_FINISH = false;
var CURRENT_MESSAGE_TYPE = RECEIVED_MESSAGE;

var ERROR_MESSAGE = "Oops, some errors happen, please try again later.";

var MessageActionMixin = {
	loadMessageListFromServer: function() {
        var api_url = getMessageListAPI(CURRENT_MESSAGE_TYPE);
        $.ajax({
            url: api_url,
            dataType: 'json',
            success: function(data) {
                this.setState({messages: data});
                FIRST_LOAD_MESSAGE_FINISH = true;
                this.forceUpdate();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(api_url, status, err.toString());
            }.bind(this)
        });
    },
    loadMessageReplyListFromServer: function(message_id) {
        var api_url = getMessageReplyListAPI(message_id);
        $.ajax({
            url: api_url,
            dataType: 'json',
            success: function(data) {
                this.setState({replies: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(api_url, status, err.toString());
            }.bind(this)
        });
    },
    handleMessageSubmit: function(data, callback) {
        var api_url = getMessageCreateAPI();
        $.ajax({
            url: api_url,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                callback();
                preparePopupMessage("Your message sent successfully!", "success");
                popupMessage();
            }.bind(this),
            error: function(xhr, status, err) {
                callback();
                console.error(api_url, status, err.toString());
                preparePopupMessage(ERROR_MESSAGE, "danger");
                popupMessage();
            }.bind(this)
        });
    },
    handleReadMssageSubmit: function(data) {
        var api_url = getMessageUnreadDeleteAPI(data.id);
        $.ajax({
            url: api_url,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(api_url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        if (this.props.messageActionMixinLoadMessageList) {
            this.loadMessageListFromServer();
        }
    },
    getInitialState: function() {
        return {
            messages: [],
            replies: [],    // replies for each message card
            replies_requested: false,   // check if load replies for message card
        };
    },
}