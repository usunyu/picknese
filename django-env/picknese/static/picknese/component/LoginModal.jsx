var LoginModal = React.createClass({
    onSignUpClick: function() {
        $('#login-box').hide();
        $('#signup-box').show();
    },
    onLogInClick: function() {
        $('#signup-box').hide();
        $('#login-box').show();
    },
    render: function() {
        return (
            <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body" style={{padding: "0px"}}>
                            <div className="row-fluid">
                                <div
                                    id="login-box"
                                    className="mainbox">
                                    <div className="panel panel-primary" style={{marginBottom: "0px"}}>
                                        <div className="panel-heading" style={{borderRadius: "0px"}}>
                                            <div className="panel-title">Sign In</div>
                                            <div style={{float: "right", fontSize: "80%", position: "relative", top: "-10px"}}>
                                                <a href="#">Forgot password?</a>
                                            </div>
                                        </div>
                                        <div style={{paddingTop: "30px"}} className="panel-body" >
                                            <div style={{display: "none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                                            <form id="login-form" className="form-horizontal" role="form">
                                                <div style={{marginBottom: "25px"}} className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                    <input
                                                        id="login-username"
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        value=""
                                                        placeholder="username or email" />
                                                </div>
                                                <div style={{marginBottom: "25px"}} className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                                    <input
                                                        id="login-password"
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="password" />
                                                </div>
                                                <div className="input-group">
                                                    <div className="checkbox">
                                                        <label>
                                                            <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div style={{marginTop: "10px"}} className="form-group">
                                                    <div className="col-sm-12 controls">
                                                        <a id="btn-login" href="#" className="btn btn-success">Login  </a>
                                                        <a id="btn-fblogin" href="#" className="btn btn-primary">Login with Facebook</a>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-12 control">
                                                        <div style={{borderTop: "1px solid#888", paddingTop: "15px", fontSize: "85%"}} >
                                                                Dont have an account! 
                                                            <a href="#" onClick={this.onSignUpClick}>
                                                                Sign Up Here
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="signup-box"
                                    style={{display: "none"}}
                                    className="mainbox">
                                    <div className="panel panel-primary" style={{marginBottom: "0px"}}>
                                        <div className="panel-heading" style={{borderRadius: "0px"}}>
                                            <div className="panel-title">Sign Up</div>
                                            <div style={{float: "right", fontSize: "85%", position: "relative", top: "-10px"}}>
                                                <a id="signinlink" href="#" onClick={this.onLogInClick}>Sign In</a>
                                            </div>
                                        </div>
                                        <div className="panel-body" >
                                            <form id="signup-form" className="form-horizontal" role="form">
                                                <div id="signupalert" style={{display: "none"}} className="alert alert-danger">
                                                    <p>Error:</p>
                                                    <span></span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" name="firstname" placeholder="First Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" name="lastname" placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                                    <div className="col-md-9">
                                                        <input type="password" className="form-control" name="passwd" placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="icode" className="col-md-3 control-label">Invitation Code</label>
                                                    <div className="col-md-9">
                                                        <input type="text" className="form-control" name="icode" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-md-offset-3 col-md-9">
                                                        <button id="btn-signup" type="button" className="btn btn-info">
                                                            <i className="icon-hand-right"></i> Sign Up
                                                        </button>
                                                        <span style={{marginLeft: "8px"}}>or</span>
                                                    </div>
                                                </div>
                                                <div style={{borderTop: "1px solid #999", paddingTop: "20px"}}  className="form-group">
                                                    <div className="col-md-offset-3 col-md-9">
                                                        <button id="btn-fbsignup" type="button" className="btn btn-primary">
                                                            <i className="icon-facebook"></i> Sign Up with Facebook
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(
    <LoginModal />,
    document.getElementById('login')
);