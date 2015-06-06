var LoginModal = React.createClass({displayName: 'LoginModal',
    onSignUpClick: function() {
        $('#login-box').hide();
        $('#signup-box').show();
    },
    onLogInClick: function() {
        $('#signup-box').hide();
        $('#login-box').show();
    },
    onLogInSubmit: function(event) {
        event.preventDefault();
        var auth_with_data = "";
        if (typeof request_data !== 'undefined') {
            auth_with_data = JSON.stringify(request_data);
            // clear request_data
            request_data = ""
        }
        $.ajax({
            url: getAuthAPI(),
            dataType: 'json',
            type: 'POST',
            data: {
                username : $("#login-username").val().trim(),
                password : $("#login-password").val().trim(),
                current_url : window.location.pathname,
                auth_with_data : auth_with_data,
            },
            success: function(data) {
                console.log(data);
                if (data.success) {
                    $("#login-modal").modal('hide');

                    if (typeof data.request_type !== 'undefined') {
                        switch(data.request_type) {
                            case PICK_REQUEST:
                            case FLIGHT_PICK_REQUEST:
                                preparePopupMessage(
                                    "You have successfully post your request. Please waiting for your picker to contact you!",
                                    "success"
                                );
                                break;
                            default:
                                break;
                        }
                    }

                    window.location = data.redirect_url;
                } else {
                    $("#login-form").addClass("has-error");
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getAuthAPI(), status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "modal fade", id: "login-modal", tabIndex: "-1", role: "dialog", 'aria-hidden': "true"}, 
                React.createElement("div", {className: "modal-dialog"}, 
                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "modal-body", style: {padding: "0px"}}, 
                            React.createElement("div", {className: "row-fluid"}, 
                                React.createElement("div", {
                                    id: "login-box", 
                                    className: "mainbox"}, 
                                    React.createElement("div", {className: "panel panel-primary", style: {marginBottom: "0px"}}, 
                                        React.createElement("div", {className: "panel-heading", style: {borderRadius: "0px"}}, 
                                            React.createElement("div", {className: "panel-title"}, "Sign In"), 
                                            React.createElement("div", {style: {float: "right", fontSize: "80%", position: "relative", top: "-10px"}}, 
                                                React.createElement("a", {href: "#", style: {color: "white"}}, "Forgot password?")
                                            )
                                        ), 
                                        React.createElement("div", {style: {paddingTop: "30px"}, className: "panel-body"}, 
                                            React.createElement("div", {style: {display: "none"}, id: "login-alert", className: "alert alert-danger col-sm-12"}), 
                                            React.createElement("form", {
                                                id: "login-form", 
                                                className: "form-horizontal", 
                                                role: "form", 
                                                onSubmit: this.onLogInSubmit}, 
                                                React.createElement("div", {style: {marginBottom: "25px"}, className: "input-group"}, 
                                                    React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "glyphicon glyphicon-user"})), 
                                                    React.createElement("input", {
                                                        id: "login-username", 
                                                        type: "text", 
                                                        className: "form-control", 
                                                        name: "username", 
                                                        placeholder: "username or email"})
                                                ), 
                                                React.createElement("div", {style: {marginBottom: "25px"}, className: "input-group"}, 
                                                    React.createElement("span", {className: "input-group-addon"}, React.createElement("i", {className: "glyphicon glyphicon-lock"})), 
                                                    React.createElement("input", {
                                                        id: "login-password", 
                                                        type: "password", 
                                                        className: "form-control", 
                                                        name: "password", 
                                                        placeholder: "password"})
                                                ), 
                                                React.createElement("div", {className: "input-group"}, 
                                                    React.createElement("div", {className: "checkbox"}, 
                                                        React.createElement("label", null, 
                                                            React.createElement("input", {id: "login-remember", type: "checkbox", name: "remember", value: "1"}), " Remember me"
                                                        )
                                                    )
                                                ), 
                                                React.createElement("div", {style: {marginTop: "10px"}, className: "form-group"}, 
                                                    React.createElement("div", {className: "col-sm-12 controls"}, 
                                                        React.createElement("button", {
                                                            id: "btn-login", 
                                                            type: "submit", 
                                                            className: "btn btn-success", 
                                                            style: {marginRight: "10px"}}, 
                                                            React.createElement("i", {className: "glyphicon glyphicon-log-in"}), " Login"
                                                        ), 
                                                        React.createElement("a", {id: "btn-fblogin", href: "#", className: "btn btn-primary"}, "Login with Facebook")
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("div", {className: "col-md-12 control"}, 
                                                        React.createElement("div", {style: {borderTop: "1px solid#888", paddingTop: "15px", fontSize: "85%"}}, 
                                                                "Dont have an account! ", React.createElement("a", {href: "#", onClick: this.onSignUpClick}, "Sign Up Here")
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ), 
                                React.createElement("div", {
                                    id: "signup-box", 
                                    style: {display: "none"}, 
                                    className: "mainbox"}, 
                                    React.createElement("div", {className: "panel panel-primary", style: {marginBottom: "0px"}}, 
                                        React.createElement("div", {className: "panel-heading", style: {borderRadius: "0px"}}, 
                                            React.createElement("div", {className: "panel-title"}, "Sign Up"), 
                                            React.createElement("div", {style: {float: "right", fontSize: "85%", position: "relative", top: "-10px"}}, 
                                                React.createElement("a", {
                                                    id: "signinlink", 
                                                    style: {color: "white"}, 
                                                    href: "#", 
                                                    onClick: this.onLogInClick}, 
                                                    "Sign In"
                                                )
                                            )
                                        ), 
                                        React.createElement("div", {className: "panel-body"}, 
                                            React.createElement("form", {id: "signup-form", className: "form-horizontal", role: "form"}, 
                                                React.createElement("div", {id: "signupalert", style: {display: "none"}, className: "alert alert-danger"}, 
                                                    React.createElement("p", null, "Error:"), 
                                                    React.createElement("span", null)
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("label", {htmlFor: "email", className: "col-md-3 control-label"}, "Email"), 
                                                    React.createElement("div", {className: "col-md-9"}, 
                                                        React.createElement("input", {type: "text", className: "form-control", name: "email", placeholder: "Email Address"})
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("label", {htmlFor: "firstname", className: "col-md-3 control-label"}, "First Name"), 
                                                    React.createElement("div", {className: "col-md-9"}, 
                                                        React.createElement("input", {type: "text", className: "form-control", name: "firstname", placeholder: "First Name"})
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("label", {htmlFor: "lastname", className: "col-md-3 control-label"}, "Last Name"), 
                                                    React.createElement("div", {className: "col-md-9"}, 
                                                        React.createElement("input", {type: "text", className: "form-control", name: "lastname", placeholder: "Last Name"})
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("label", {htmlFor: "password", className: "col-md-3 control-label"}, "Password"), 
                                                    React.createElement("div", {className: "col-md-9"}, 
                                                        React.createElement("input", {type: "password", className: "form-control", name: "passwd", placeholder: "Password"})
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("label", {htmlFor: "icode", className: "col-md-3 control-label"}, "Invitation Code"), 
                                                    React.createElement("div", {className: "col-md-9"}, 
                                                        React.createElement("input", {type: "text", className: "form-control", name: "icode", placeholder: ""})
                                                    )
                                                ), 
                                                React.createElement("div", {className: "form-group"}, 
                                                    React.createElement("div", {className: "col-md-offset-3 col-md-9"}, 
                                                        React.createElement("button", {id: "btn-signup", type: "button", className: "btn btn-info"}, 
                                                            React.createElement("i", {className: "icon-hand-right"}), " Sign Up"
                                                        ), 
                                                        React.createElement("span", {style: {marginLeft: "8px"}}, "or")
                                                    )
                                                ), 
                                                React.createElement("div", {style: {borderTop: "1px solid #999", paddingTop: "20px"}, className: "form-group"}, 
                                                    React.createElement("div", {className: "col-md-offset-3 col-md-9"}, 
                                                        React.createElement("button", {id: "btn-fbsignup", type: "button", className: "btn btn-primary"}, 
                                                            React.createElement("i", {className: "icon-facebook"}), " Sign Up with Facebook"
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(LoginModal, null),
    document.getElementById('login')
);