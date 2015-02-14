var SignupInfoPanel = React.createClass({
    render: function() {
        return (
            <p>Sign Up Info</p>
        );
    }
});

var SignupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onSignupSubmit({
            username : this.refs.username.getDOMNode().value.trim(),
            email : this.refs.email.getDOMNode().value.trim(),
            first_name : this.refs.first_name.getDOMNode().value.trim(),
            last_name : this.refs.last_name.getDOMNode().value.trim(),
            password : this.refs.password.getDOMNode().value.trim(),
        });
        window.location.replace("/");
    },
    render: function() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="col-md-3 control-label">Username</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="username" placeholder="Username" ref="username" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-md-3 control-label">Email</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="email" placeholder="Email Address" ref="email"  />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="first_name" className="col-md-3 control-label">First Name</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="first_name" placeholder="First Name" ref="first_name" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name" className="col-md-3 control-label">Last Name</label>
                    <div className="col-md-9">
                        <input type="text" className="form-control" name="last_name" placeholder="Last Name" ref="last_name" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-md-3 control-label">Password</label>
                    <div className="col-md-9">
                        <input type="password" className="form-control" name="password" placeholder="Password" ref="password" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-3 col-md-9">
                        <button type="submit" className="btn btn-success"><i className="icon-hand-right"></i> Sign Up</button>
                        <span style={{marginLeft: '8px'}}>or</span>  
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <div className="col-md-offset-3 col-md-9">
                        <button type="button" className="btn btn-primary"><i className="icon-facebook"></i> Sign Up with Facebook</button>
                    </div>
                </div>
            </form>
        );
    }
});

var SignupBoxPanel = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Please Sign Up</div>
                    <div style={{float: 'right', fontSize: '85%', position: 'relative', top:'-10px'}}>
                        Already have account? &nbsp;<a href="/accounts/login/">Sign In</a>
                    </div>
                </div>
                <div className="panel-body" >
                    <SignupForm 
                        onSignupSubmit={this.props.handleSignupSubmit}/>
                </div>
            </div>
        );
    }
});

var SignupPanel = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleSignupSubmit: function(signupData) {
        $.ajax({
            url: this.props.signupURL,
            dataType: 'json',
            type: 'POST',
            data: signupData,
            success: function(data) {
                // TODO
                console.log('success');
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.signupURL, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="row col-md-12"
                 style={{marginTop: '50px'}} >
                <div className="col-md-6">
                    <SignupInfoPanel />
                </div>
                <div className="col-md-6">
                    <SignupBoxPanel 
                        handleSignupSubmit={this.handleSignupSubmit} />
                </div>
            </div>
        );
    }
});

React.render(
    <SignupPanel 
        signupURL="/accounts/api/signup/"/>,
    document.getElementById('content')
);
