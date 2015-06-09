/*
 * Template Parameters
 * --------------------------------------------------
 * @current_user
 * @university
 */
var FIRST_LOAD_HOME_FEED_FINISH = false;

var HomePanel = React.createClass({
    mixins: [HomeFeedActionMixin],
    componentDidMount: function() {
        if (hasPopupMessage()) {
            setTimeout(function() { popupMessage(); }, 500);
        }
        // enable Bootstrap-Select
        $('.selectpicker').selectpicker();
    },
    onFeedTypeChange: function(event) {
        CURRENT_FEED_TYPE = event.target.value;
        this.loadHomeFeedFromServer();
    },
    getFeedTypeSelect: function() {
        return (
            <select
                className="selectpicker"
                data-style="btn-primary"
                onChange={this.onFeedTypeChange}>
                <option
                    data-icon="icon-th"
                    key={ALL_POST}
                    value={ALL_POST}>
                    All Post
                </option>
                <option
                    data-icon="icon-cab"
                    key={PICK_REQUEST}
                    value={PICK_REQUEST}>
                    Carpool Request
                </option>
                <option
                    data-icon="icon-flight"
                    key={FLIGHT_PICK_REQUEST}
                    value={FLIGHT_PICK_REQUEST}>
                    Flight Pick Request
                </option>
            </select>
        );
    },
    onNoPostRequestButtonClick: function() {
        location.href = getPostRequestURL(university.id);
    },
    render: function() {
        var homeFeedList = [];
        for (var i = 0; i < this.state.feeds.length; i++) {
            var feed = this.state.feeds[i];
            switch(feed.feed_type) {
                case PICK_REQUEST:
                    homeFeedList.push(
                        <PickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handlePickUpSubmit}
                            onCancel={this.handlePickRequestCancel}
                            cancelCallback={this.loadHomeFeedFromServer} />
                    );
                    break;
                case FLIGHT_PICK_REQUEST:
                    homeFeedList.push(
                        <FlightPickRequestCard
                            key={i}
                            feed={feed}
                            onSubmit={this.handleFlightPickUpSubmit}
                            onCancel={this.handleFlightPickRequestCancel}
                            cancelCallback={this.loadHomeFeedFromServer} />
                    );
                    break;
                default:
                    break;
            }
        }
        if (homeFeedList.length == 0 && FIRST_LOAD_HOME_FEED_FINISH) {
            // add a dummy post if we have no feed
            homeFeedList.push(
                <div className="panel clearfix fadein-effect home-feed-panel-div" key='dummy card'>
                    <div className="panel-heading" style={{overflow: "auto"}}>
                        <b>Current No Post To Show Yet! Be the first one to post:)</b>
                    </div>
                    <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                    <div className="panel-body" style={{backgroundColor: "#fcf0e4"}}>
                        <div className="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
                            <img src={getPusheenSadnessGif()} />
                        </div>
                        <button
                            type="button"
                            className="btn btn-red col-xs-12"
                            onClick={this.onNoPostRequestButtonClick} >
                            Post Your Request
                        </button>
                    </div>
                </div>
            );
        }
        if (homeFeedList.length == 0 && !FIRST_LOAD_HOME_FEED_FINISH) {
            // add a loading panel if we havn't finish the request
            homeFeedList.push(
                <div className="panel clearfix home-feed-panel-div" key='loading card'>
                    <h6 style={{marginLeft: "85px"}}>Loading ...</h6>
                    <hr style={{marginTop: "9px", marginBottom: "0px"}}/>
                    <div className="panel-body">
                        <div className="media">
                            <div className="media-left">
                                <img
                                    className="image-circular"
                                    src={getProfileDefaultPic()}
                                    style={{width: "60px", height: "60px", marginTop: "-60px", marginLeft: "-7px"}} />
                            </div>
                            <div className="media-body col-md-12" style={{textAlign: "center"}}>
                                <div className="spinner" style={{marginTop: "20px", marginBottom: "40px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-sm-12 col-md-9 home-feed-card-div">
                <div className="feed-type-select-xs-div hidden-sm hidden-md hidden-lg col-sm-12">
                    {this.getFeedTypeSelect()}
                </div>
                <div className="col-sm-9 col-md-10 home-feed-card-div">
                    {homeFeedList}
                </div>
                <div className="hidden-xs col-sm-2 col-md-2">
                    {this.getFeedTypeSelect()}
                </div>
            </div>
        );
    }
});

React.render(
    <HomePanel
        homeFeedActionMixinLoadHomeFeedInterval={true}
        pollInterval={20000}/>,
    document.getElementById('content')
);