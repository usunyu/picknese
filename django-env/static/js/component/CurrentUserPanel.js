var CurrentUserPanel = React.createClass({
    render: function() {
        if (!this.props.currentUser || !this.props.currentUser.id) {
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <hr />
                        <p>Hello World, please login :)</p>
                    </div>
                    <hr />
                </div>
            );
        }
        var currentUser = this.props.currentUser;
        var avatar = currentUser.profile.avatar;

        var imgurl = getStaticURL() + 'images/glyphicons/png/glyphicons-6-car.png';
        var imgurl2 = getStaticURL() + 'images/glyphicons/png/glyphicons-39-airplane.png';

        return (
            <div className="panel panel-primary clearfix">
                <div className="panel-heading" style={{minHeight: '80px'}}></div>
                <div className="panel-body" style={{marginTop: '-70px'}}>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <img
                                className="img-thumbnail"
                                src={avatar ? avatar : getProfileDefaultPic()}
                                style={{width: '100px', height: '100px'}} />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6" style={{marginTop: '25px'}}>
                            <p className="color-white">
                                <b>{currentUser.first_name} {currentUser.last_name}</b>
                            </p>
                            <p>
                                <a href="/accounts/profile/">Edit Profile</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="list-group">
                    <a href="#" className="list-group-item">
                        <span className="badge">14</span>
                        <img src={imgurl2} style={{width: '15px'}} /> &nbsp; My Pick Up List
                    </a>
                    <a href="#" className="list-group-item">
                        <img src={imgurl} style={{width: '15px'}} /> &nbsp; My Carpool List
                    </a>
                </div>
            </div>
        );
    }
});