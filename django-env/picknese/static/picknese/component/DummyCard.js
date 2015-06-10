
var PusheenCard = React.createClass({displayName: 'PusheenCard',
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
                        React.createElement("img", {src: getPusheenSadnessGif()})
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