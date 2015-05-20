/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 */

var FlightPickRequestList = React.createClass({displayName: 'FlightPickRequestList',
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                React.createElement(PickRequester, {
                    key: pickRequester.id, 
                    pickRequester: pickRequester, 
                    picker: this.props.currentUser, 
                    handlePickupSubmit: this.props.handlePickupSubmit, 
                    onPickRequesterCancel: this.props.handlePickRequesterCancel})
            );
        }
        return (
            React.createElement("div", null, 
                React.createElement(PickRequesterForm, {
                    currentUser: this.props.currentUser, 
                    university: this.props.university, 
                    onPickRequesterSubmit: this.props.handlePickRequesterSubmit}), 
                pickRequesters
            )
        );
    }
});

var HomeFeedList2 = React.createClass({displayName: 'HomeFeedList2',
    render: function() {
        var homeFeedList  = [];
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                React.createElement(PickRequester, {
                    key: pickRequester.id, 
                    pickRequester: pickRequester, 
                    picker: this.props.currentUser, 
                    handlePickupSubmit: this.props.handlePickupSubmit, 
                    onPickRequesterCancel: this.props.handlePickRequesterCancel})
            );
        }
        return (
            React.createElement("div", null, 
                React.createElement(PickRequesterForm, {
                    currentUser: this.props.currentUser, 
                    university: this.props.university, 
                    onPickRequesterSubmit: this.props.handlePickRequesterSubmit}), 
                pickRequesters
            )
        );
    }
});

var HomeFeedList = React.createClass({displayName: 'HomeFeedList',
    render: function() {
        for (var i = 0; i < this.props.feeds.length; i++) {
            var feed = this.props.feeds[i];
            // switch(feed.feed_type) {
            //     case n:
            // default:
            //     default code block
            // }
            // HomeFeedList.push(
            //     <PickRequester
            //         key={pickRequester.id}
            //         pickRequester={pickRequester}
            //         picker={this.props.currentUser}
            //         handlePickupSubmit={this.props.handlePickupSubmit}
            //         onPickRequesterCancel={this.props.handlePickRequesterCancel} />
            // )
        }
        return (
            React.createElement("div", null, "TODO")
        );
    }
});

var PICK_REQUEST                = 1
var PICK_UP                     = 2
var FLIGHT_PICK_REQUEST         = 3
var FLIGHT_PICK_UP              = 4
var CARPOOL_POST                = 5

var HomePanel = React.createClass({displayName: 'HomePanel',
    mixins: [HomeFeedActionMixin],
    render: function() {
        var homeFeedList = [];
        for (var i = 0; i < this.state.feeds.length; i++) {
            var feed = this.state.feeds[i];
            switch(feed.feed_type) {
                case PICK_REQUEST:
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        React.createElement(FlightPickRequestCard, {
                            key: feed.id, 
                            feed: feed})
                    );
                    break;
                default:
                    break;
            }
        }
        return (
            React.createElement("div", null, 
                homeFeedList
            )
        );
    }
});

React.render(
    React.createElement(HomePanel, {
        pollInterval: 20000}),
    document.getElementById('content')
);