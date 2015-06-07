
var FlightPickUpCard = React.createClass({displayName: 'FlightPickUpCard',
    render: function() {
        var feed = this.props.feed;
        var flight_pick_request = feed.flight_pick_request;
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("a", {href: "#", className: "home-feed-sm-profile"}, 
                        React.createElement("img", {
                            className: "image-circular", 
                            src: 
                                feed.picker.profile.avatar ? 
                                feed.picker.profile.avatar : getProfileDefaultPic(), 
                            
                            style: {width: '40px', height: '40px'}})
                    ), 
                    React.createElement("b", {className: "home-feed-title"}, feed.picker.first_name, " ", feed.picker.last_name, " is taking this ", React.createElement("span", {className: "label label-success", style: {fontSize: "95%"}}, "flight pick request")), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "8px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD HH:mm")), 
                        React.createElement("i", {className: "icon-ok-circled", style: {marginTop: "3px"}})
                    )
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {paddingBottom: "0px"}}, 
                    React.createElement("div", {className: "media-left"}, 
                        React.createElement("a", {href: "#", className: "home-feed-md-profile"}, 
                            React.createElement("img", {
                                className: "image-circular", 
                                src: 
                                    feed.picker.profile.avatar ? 
                                    feed.picker.profile.avatar : getProfileDefaultPic(), 
                                
                                style: {width: '60px', height: '60px', marginTop: '-60px', marginLeft: '-7px'}})
                        )
                    ), 
                    React.createElement("div", {className: "media-body"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("p", {
                                className: "col-md-12", 
                                'data-toggle': "tooltip", 
                                'data-placement': "left", 
                                title: "Message"}, 
                                React.createElement("i", {className: "glyphicon glyphicon-comment"}), " ", feed.description
                            )
                        )
                    )
                ), 

                React.createElement(FlightPickRequestCard, {
                    feed: flight_pick_request, 
                    onCancel: this.props.onCancel, 
                    cancelCallback: this.props.cancelCallback, 
                    onReject: this.props.onReject, 
                    rejectCallback: this.props.rejectCallback}), 
                
                React.createElement("div", {className: "panel-body home-feed-panel-body-nested-div"}, 
                    React.createElement("div", null, 
                        React.createElement("button", {
                            type: "button", 
                            className: "btn btn-danger", 
                            style: {float: 'right'}, 
                            'data-toggle': "modal", 
                            'data-target': "#feed-" + feed.id}, 
                            React.createElement("i", {className: "glyphicon glyphicon-remove"}), " " + ' ' +
                            "Reject"
                        )
                    )
                )
            )
        );
    }
});