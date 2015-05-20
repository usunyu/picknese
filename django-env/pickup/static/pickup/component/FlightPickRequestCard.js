var FlightPickRequestCard = React.createClass({displayName: 'FlightPickRequestCard',
    render: function() {
        var feed = this.props.feed;
        var moment_datetime = moment(feed.date_time, "YYYY-MM-DD HH:mm");

        return (
            React.createElement("div", {className: "panel panel-primary fadein-effect"}, 
                React.createElement("div", {className: "panel-heading"}, 
                    React.createElement("h3", {
                        className: "panel-title", 
                        style: {marginLeft: "71px"}}, 
                        React.createElement("b", null, feed.requester.first_name, " ", feed.requester.last_name), " is asking for a flight pick up"
                    )
                ), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {
                                    className: "image-circular", 
                                    src: 
                                        feed.requester.profile.avatar ? 
                                        feed.requester.profile.avatar : getProfileDefaultPic(), 
                                    
                                    style: {width: '60px', height: '60px', marginTop: '-50px'}})
                            )
                        ), 
                        React.createElement("div", {className: "media-body"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", null, 
                                    React.createElement("p", {className: "col-md-5", 
                                       'data-toggle': "tooltip", 
                                       'data-placement': "left", 
                                       title: "Flight Number"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-plane"}), " ", feed.flight
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       'data-toggle': "tooltip", 
                                       'data-placement': "left", 
                                       title: "Arrival Time"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment_datetime.format("YYYY-MM-DD HH:mm")
                                    ), 
                                    React.createElement("p", {className: "col-md-12", 
                                       'data-toggle': "tooltip", 
                                       'data-placement': "left", 
                                       title: "Destination"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", feed.destination
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       'data-toggle': "tooltip", 
                                       'data-placement': "left", 
                                       title: "Pay"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", feed.price
                                    ), 
                                    React.createElement("p", {className: "col-md-5", 
                                       'data-toggle': "tooltip", 
                                       'data-placement': "left", 
                                       title: "Baggage Number"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-briefcase"}), " ", feed.bags
                                    )
                                ), 
                                React.createElement("p", {className: "col-md-12", 
                                   'data-toggle': "tooltip", 
                                   'data-placement': "left", 
                                   title: "Message"}, 
                                    React.createElement("i", {className: feed.description ? "glyphicon glyphicon-comment" : ""}), " ", feed.description
                                )
                            )
                        )
                    ), 
                    React.createElement("hr", {style: {marginTop: '5px', marginBottom: '15px'}})
                )
            )
        );
    }
});