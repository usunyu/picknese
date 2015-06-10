
var PusheenCard = React.createClass({
    onPusheenPostRequestButtonClick: function() {
        location.href = getPostRequestURL(university.id);
    },
    render: function() {
        return (
            <div className="panel clearfix fadein-effect home-feed-panel-div">
                <div className="panel-heading" style={{overflow: "auto"}}>
                    <b>Current no post to show yet, try post one:)</b>
                </div>
                <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                <div className="panel-body" style={{backgroundColor: "#fcf0e4"}}>
                    <div className="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
                        <img src={getPusheenSadnessGif()} />
                    </div>
                    <button
                        type="button"
                        className="btn btn-red col-xs-12"
                        onClick={this.onPusheenPostRequestButtonClick} >
                        Post Your Request
                    </button>
                </div>
            </div>
        );
    }
});

var LoadingCard = React.createClass({
    render: function() {
        return (
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
});