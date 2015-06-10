
var PusheenSadnessCard = React.createClass({displayName: 'PusheenSadnessCard',
    onPusheenPostRequestButtonClick: function() {
        location.href = getPostRequestURL(university.id);
    },
    render: function() {
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("b", null, "Current no post to show yet, try post one:)")
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {backgroundColor: "#fcf0e4"}}, 
                    React.createElement("div", {className: "col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4"}, 
                        React.createElement("img", {src: getPusheenSadnessGif(), style: {width: "100%"}})
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-red col-xs-12", 
                        onClick: this.onPusheenPostRequestButtonClick}, 
                        "Post Your Request"
                    )
                )
            )
        );
    }
});

var PusheenHappyCard = React.createClass({displayName: 'PusheenHappyCard',
    onPusheenPostRequestButtonClick: function() {
        location.href = getPostRequestURL(0);
    },
    render: function() {
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("b", null, "You dont have request yet, try post one to your school:)")
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {backgroundColor: "#fcf0e4"}}, 
                    React.createElement("div", {className: "col-xs-12 col-md-offset-3 col-md-6"}, 
                        React.createElement("img", {src: getPusheenHappyGif(), style: {width: "100%"}})
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-red col-xs-12", 
                        onClick: this.onPusheenPostRequestButtonClick}, 
                        "Post Your Request"
                    )
                )
            )
        );
    }
});

var PusheenLazyCard = React.createClass({displayName: 'PusheenLazyCard',
    onPusheenPostRequestButtonClick: function() {
        location.href = getPostRequestURL(0);
    },
    render: function() {
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("b", null, "You dont have offer yet, try to help someone:)")
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {backgroundColor: "#fcf0e4"}}, 
                    React.createElement("div", {className: "col-xs-12 col-md-offset-3 col-md-6"}, 
                        React.createElement("img", {src: getPusheenLazyGif(), style: {width: "100%"}})
                    ), 
                    React.createElement("button", {
                        type: "button", 
                        className: "btn btn-red col-xs-12", 
                        onClick: this.onPusheenPostRequestButtonClick}, 
                        "Post Your Request"
                    )
                )
            )
        );
    }
});

var PusheenGangnamStyleCard = React.createClass({displayName: 'PusheenGangnamStyleCard',
    render: function() {
        return (
            React.createElement("div", {className: "panel clearfix fadein-effect home-feed-panel-div"}, 
                React.createElement("div", {className: "panel-heading", style: {overflow: "auto"}}, 
                    React.createElement("b", null, "This function has not implemented yet, please have a little faith:)")
                ), 
                React.createElement("hr", {style: {marginTop: "0px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body", style: {backgroundColor: "#fcf0e4"}}, 
                    React.createElement("div", {className: "col-xs-12 col-md-offset-3 col-md-6"}, 
                        React.createElement("img", {src: getPusheenGangnamStyleGif(), style: {width: "100%"}})
                    )
                )
            )
        );
    }
});

var LoadingCard = React.createClass({displayName: 'LoadingCard',
    render: function() {
        return (
            React.createElement("div", {className: "panel clearfix home-feed-panel-div", key: "loading card"}, 
                React.createElement("h6", {style: {marginLeft: "85px"}}, "Loading ..."), 
                React.createElement("hr", {style: {marginTop: "9px", marginBottom: "0px"}}), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement("div", {className: "media"}, 
                        React.createElement("div", {className: "media-left"}, 
                            React.createElement("img", {
                                className: "image-circular", 
                                src: getProfileDefaultPic(), 
                                style: {width: "60px", height: "60px", marginTop: "-60px", marginLeft: "-7px"}})
                        ), 
                        React.createElement("div", {className: "media-body col-md-12", style: {textAlign: "center"}}, 
                            React.createElement("div", {className: "spinner", style: {marginTop: "20px", marginBottom: "40px"}})
                        )
                    )
                )
            )
        );
    }
});