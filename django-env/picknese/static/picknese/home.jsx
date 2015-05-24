/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */

var FlightPickRequestList = React.createClass({
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                <PickRequester
                    key={pickRequester.id}
                    pickRequester={pickRequester}
                    picker={this.props.currentUser}
                    handlePickupSubmit={this.props.handlePickupSubmit}
                    onPickRequesterCancel={this.props.handlePickRequesterCancel} />
            );
        }
        return (
            <div>
                <PickRequesterForm 
                    currentUser={this.props.currentUser}
                    university={this.props.university}
                    onPickRequesterSubmit={this.props.handlePickRequesterSubmit} />
                {pickRequesters}
            </div>
        );
    }
});

var HomeFeedList2 = React.createClass({
    render: function() {
        var homeFeedList  = [];
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                <PickRequester
                    key={pickRequester.id}
                    pickRequester={pickRequester}
                    picker={this.props.currentUser}
                    handlePickupSubmit={this.props.handlePickupSubmit}
                    onPickRequesterCancel={this.props.handlePickRequesterCancel} />
            );
        }
        return (
            <div>
                <PickRequesterForm 
                    currentUser={this.props.currentUser}
                    university={this.props.university}
                    onPickRequesterSubmit={this.props.handlePickRequesterSubmit} />
                {pickRequesters}
            </div>
        );
    }
});

var HomeFeedList = React.createClass({
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
            <div>TODO</div>
        );
    }
});

var HomePanel = React.createClass({
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
                        <FlightPickRequestCard
                            key={feed.id}
                            feed={feed} />
                    );
                    break;
                default:
                    break;
            }
        }
        return (
            <div>
                {homeFeedList}
            </div>
        );
    }
});

React.render(
    <HomePanel
        pollInterval={20000}/>,
    document.getElementById('content')
);