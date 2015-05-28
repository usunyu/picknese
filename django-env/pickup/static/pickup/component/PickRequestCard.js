var PickRequestCard = React.createClass({displayName: 'PickRequestCard',
    componentDidUpdate: function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    },
    render: function() {
        var feed = this.props.feed;
        return (
            React.createElement("div", {className: "panel panel-primary clearfix fadein-effect"}, 
                React.createElement("h6", {
                    style: {marginLeft: '80px', marginRight: '4px', color: '#666666'}}, 
                    React.createElement("a", {href: "#"}, 
                        React.createElement("b", null, feed.requester.first_name, " ", feed.requester.last_name)
                    ), 
                    React.createElement("b", null, " is looking for ", React.createElement("span", {className: "label label-success", style: {fontSize: "95%"}}, "pick up")), 
                    React.createElement("div", {style: {float: "right"}}, 
                        React.createElement("span", {style: {fontSize: "80%", marginRight: "15px", marginTop: "3px"}}, moment(feed.created).format("YYYY-MM-DD HH:mm")), 
                        React.createElement("i", {className: "glyphicon glyphicon-tag", style: {marginRight: "10px"}})
                    )
                ), 
                React.createElement("hr", {style: {marginTop: '9px', marginBottom: '0px'}}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("a", {href: "#"}, 
                                React.createElement("img", {
                                    className: "image-circular", 
                                    src: 
                                        feed.requester.profile.avatar ? 
                                        feed.requester.profile.avatar : getProfileDefaultPic(), 
                                    
                                    style: {width: '60px', height: '60px', marginTop: '-60px', marginLeft: '-7px'}})
                            )
                        ), 
                        React.createElement("div", {className: "media-body"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", null, 
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Start"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-tag"}), " ", feed.start
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Destination"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-map-marker"}), " ", feed.destination
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-5", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Pick Time"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-time"}), " ", moment(feed.date_time).format("YYYY-MM-DD HH:mm")
                                    ), 
                                    React.createElement("p", {
                                        className: "col-md-5", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Pay"}, 
                                        React.createElement("i", {className: "glyphicon glyphicon-credit-card"}), " $", feed.price
                                    ), 
                                    feed.description ? 
                                    React.createElement("p", {
                                        className: "col-md-10", 
                                        'data-toggle': "tooltip", 
                                        'data-placement': "left", 
                                        title: "Message"}, 
                                        React.createElement("i", {className: feed.description ? "glyphicon glyphicon-comment" : ""}), " ", feed.description
                                    ) : null
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