var CurrentUserPanel = React.createClass({
    render: function() {
        if (!this.props.currentUser || !this.props.currentUser.id) {
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <hr />
                        <p>Hello World</p>
                    </div>
                    <hr />
                </div>
            );
        }
        var currentUser = this.props.currentUser;
        var avatar = currentUser.profile.avatar;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <img
                                className="img-circle box-shadow"
                                src={avatar ? avatar : '/media/images/avatar/default_pic.png'}
                                style={{width: '100px', height: '100px'}} />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6">
                            <p style={{marginTop: '10px', marginBottom: '-10px'}}>
                                <b>{currentUser.first_name} {currentUser.last_name}</b>
                            </p>
                            <hr />
                            <p style={{marginTop: '-10px'}}>
                                <a href="#">Edit Profile</a>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <button
                        type="button"
                        className="btn btn-primary col-xs-12 col-sm-12 col-md-12" >
                        <i className="glyphicon glyphicon-send"></i>&nbsp;
                        Post Your Request
                    </button>
                </div>
                <hr />
            </div>
        );
    }
});