var MyProfilePanel = React.createClass({
    mixins: [LoadCurrentUserMixin],
    render: function() {
        var currentUser = this.state.currentUser;
        if (!currentUser || !currentUser.id) {
            return <div></div>;
        }
        var profileImage = currentUser.profile.avatar ? currentUser.profile.avatar : getProfileDefaultPic();
        var env = findBootstrapEnvironment();
        return (
            <div>
                <div className="jumbotron"
                     style={{backgroundColor: "#666362", minHeight: env == "xs" ? "300px" : "390px"}} >
                </div>
                <div className="container" style={{marginTop: env == "xs" ? "-240px" : "-360px"}} >
                    <div className="media">
                        <div className="media-left">
                            <div className="show-image">
                                <img className="media-object box-shadow hidden-xs"
                                     src={profileImage}
                                     style={{width: '225px', height: '225px'}} />
                                <button type="button" className="btn btn-default btn-lg btn-on-image">
                                    <i className="glyphicon glyphicon-camera"></i>&nbsp; Change Photo
                                </button>
                            </div>
                            <img className="media-object box-shadow hidden-sm hidden-md hidden-lg"
                                 src={profileImage}
                                 style={{width: '100px', height: '100px'}} />
                        </div>
                        <div className="media-body"
                             style={{marginTop: "10px"}}>
                            <h3 className="media-heading color-white">{currentUser.first_name} {currentUser.last_name}</h3>
                            <div className="container color-white hidden-xs">
                                <div className="col-md-6">
                                    <p>University of Southern California, 2012-2014</p>
                                </div>
                                <div className="col-md-6">
                                    <p>WeChat: sunny77yu</p>
                                </div>
                            </div>
                            <div className="hidden-sm hidden-md hidden-lg">
                                <button type="button" className="btn btn-default btn-sm btn-on-image">
                                    <i className="glyphicon glyphicon-home"></i>&nbsp; More Info
                                </button>
                            </div>
                        </div>
                        <hr />
                        <ul className="inline-list text-center"
                            style={{paddingLeft: "0px"}}>
                            <li className="active col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <a href="#tab_picks" data-toggle="tab">Picks</a>
                                &nbsp;&nbsp;<span className="badge">3</span>
                            </li>
                            <li className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <a href="#tab_carpools" data-toggle="tab">Carpools</a>
                                &nbsp;&nbsp;<span className="badge">5</span>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane fadein-effect active" id="tab_picks">
                            tab_picks
                        </div>
                        <div className="tab-pane fadein-effect" id="tab_carpools">
                            tab_carpools
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <MyProfilePanel />,
    document.getElementById('content')
);