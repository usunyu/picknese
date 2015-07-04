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

var CURRENT_MESSAGE_TYPE = RECEIVED_MESSAGE;

var MessageActionMixin = {
	loadMessageListFromServer: function() {
        $.ajax({
            url: getMessageListAPI(CURRENT_MESSAGE_TYPE),
            dataType: 'json',
            success: function(data) {
                this.setState({messages: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getMessageListAPI(CURRENT_MESSAGE_TYPE), status, err.toString());
            }.bind(this)
        });
    },
    loadMessageReplyListFromServer: function(message_id) {
        $.ajax({
            url: getMessageReplyListAPI(message_id),
            dataType: 'json',
            success: function(data) {
                this.setState({replies: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getMessageReplyListAPI(message_id), status, err.toString());
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
            replies_requested: false, 
        };
    },
}