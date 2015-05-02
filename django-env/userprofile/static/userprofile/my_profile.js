var MyProfilePanel = React.createClass({displayName: "MyProfilePanel",
    mixins: [LoadCurrentUserMixin,
             PickRequesterActionMixin,
             PickUpActionMixin,
             UniversityActionMixin],
    renderProfileImage: function(currentUser) {
        var profileImage = currentUser.profile.avatar ? currentUser.profile.avatar : getProfileDefaultPic();
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "show-image"}, 
                    React.createElement("img", {className: "media-object box-shadow hidden-xs", 
                         src: profileImage, 
                         style: {width: '225px', height: '225px'}}), 
                    React.createElement("button", {type: "button", className: "btn btn-default btn-lg btn-on-image", 
                            "data-toggle": "modal", "data-target": "#imageUploadModal"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-camera"}), "  Change Photo"
                    )
                ), 
                React.createElement("img", {className: "media-object box-shadow hidden-sm hidden-md hidden-lg", 
                     src: profileImage, 
                     style: {width: '100px', height: '100px'}}), 
                React.createElement("div", {className: "modal fade", id: "imageUploadModal", tabIndex: "-1", role: "dialog", 
                     "aria-labelledby": "imageUploadModalLabel", "aria-hidden": "true"}, 
                    React.createElement("div", {className: "modal-dialog"}, 
                        React.createElement("div", {className: "modal-content"}, 
                            React.createElement("div", {className: "modal-header"}, 
                                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                                    React.createElement("span", {"aria-hidden": "true"}, "×")
                                ), 
                                React.createElement("h4", {className: "modal-title", id: "imageUploadModalLabel"}, "Change Profile Photo")
                            ), 
                            React.createElement("hr", {style: {marginTop: "-10px"}}), 
                            React.createElement("div", {className: "modal-body"}, 
                                React.createElement("div", {id: "image_input"}, 
                                    React.createElement("img", {className: "media-object box-shadow", 
                                         src: profileImage, 
                                         style: {width: '225px', height: '225px'}})
                                ), 
                                React.createElement("div", {id: "image_code"})
                            ), 
                            React.createElement("div", {className: "modal-footer"}, 
                                React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                React.createElement("span", {className: "btn btn-primary btn-file"}, 
                                    "Browse", 
                                    React.createElement("input", {type: "file", id: "image_file", 
                                           onClick: this.clickUploadImage, 
                                           onChange: this.changeUploadImage, 
                                           ref: "imageFile"})
                                ), 
                                React.createElement("button", {type: "button", className: "btn btn-primary", 
                                        onClick: this.submitUploadImage}, 
                                    "Save Changes"
                                )
                            )
                        )
                    )
                )
            )
        );
    },
    renderProfileInfo: function(currentUser) {
        return (
            React.createElement("div", null, 
                React.createElement("h3", {className: "media-heading color-white", 
                    style: {marginLeft: "15px"}}, 
                    currentUser.first_name, " ", currentUser.last_name
                ), 
                React.createElement("div", {className: "hidden-xs"}, 
                    React.createElement("div", {className: "col-md-5 button-hide-wrap"}, 
                        React.createElement("p", {className: "normal-font-size color-white"}, React.createElement("b", null, "Current University:")), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "Facebook, 2014-present"), 
                        React.createElement("p", {className: "normal-font-size color-white"}, React.createElement("b", null, "Previous University:")), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "Shanghai Jiao Tong University, 2007-2011"), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "University of Southern California, 2012-2014"), 
                        React.createElement("div", {className: "button-hide-div"}, 
                            /* update info button */
                            React.createElement("button", {
                                type: "button", 
                                className: "btn btn-default btn-xs", 
                                "data-toggle": "modal", 
                                "data-target": "#update-info-modal", 
                                onClick: this.loadUniversitySimpleListFromServer}, 
                                React.createElement("i", {className: "glyphicon glyphicon-pencil"}), " " + ' ' +
                                "Update Info"
                            ), 
                            /* update university info modal */
                            React.createElement("div", {className: "modal fade", 
                                 id: "update-info-modal", 
                                 tabIndex: "-1", role: "dialog", 
                                 "aria-hidden": "true"}, 
                                React.createElement("div", {className: "modal-dialog"}, 
                                    React.createElement("div", {className: "modal-content"}, 
                                        React.createElement("div", {className: "modal-header"}, 
                                            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, 
                                                React.createElement("span", {"aria-hidden": "true"}, "×")
                                            ), 
                                            React.createElement("h4", {className: "modal-title"}, "Update Your University Info")
                                        ), 
                                        React.createElement("hr", {style: {marginTop: "-10px"}}), 
                                        React.createElement("div", {className: "modal-body"}, 
                                            React.createElement(UserProfileInfoForm, {
                                                universitySimpleList: this.state.universitySimpleList})
                                        ), 
                                        React.createElement("div", {className: "modal-footer"}, 
                                            React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Cancel"), 
                                            React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Save changes")
                                        )
                                    )
                                )
                            )
                        )
                    ), 
                    React.createElement("div", {className: "col-md-offset-4 col-md-3 button-hide-wrap"}, 
                        React.createElement("p", {className: "normal-font-size color-white"}, React.createElement("b", null, "Contact Info:")), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "Phone: +1 (650) 561-5620"), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "WeChat: sunny77yu"), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "QQ: 845863869"), 
                        React.createElement("p", {className: "normal-font-size color-white"}, "Email: usunyu@sina.com"), 
                        React.createElement("div", {className: "button-hide-div"}, 
                            React.createElement("button", {
                                type: "button", 
                                className: "btn btn-default btn-xs"}, 
                                React.createElement("i", {className: "glyphicon glyphicon-pencil"}), " " + ' ' +
                                "Update Contact"
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "hidden-sm hidden-md hidden-lg", 
                     style: {marginLeft: "15px"}}, 
                    React.createElement("button", {type: "button", className: "btn btn-default btn-sm btn-on-image"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-home"}), "  More Info"
                    )
                )
            )
        );
    },
    submitUploadImage: function(evt) {
        var imageCode = $('#image_code').attr('code');
        if (imageCode == null) {
            $( "#image_input" ).effect("shake");
            return;
        }
        $.ajax({
            url: getProfileImageUploadAPI(),
            dataType: 'json',
            type: 'PUT',
            data: {image_code : imageCode},
            success: function(data) {
                // close dialog on success
                $('#imageUploadModal').modal('hide');
                // reload data
                location.reload();
                // this.loadCurrentUserFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getProfileImageUploadAPI(), status, err.toString());
            }.bind(this)
        });

    },
    clickUploadImage: function(evt) {
        this.refs.imageFile.getDOMNode().value = null;
    },
    changeUploadImage: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.dataTransfer !== undefined ? evt.dataTransfer.files[0] : evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function() {
                    var canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = image.height * (300 / image.width);
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    $('#image_input')
                        .html(['<img class="media-object box-shadow" src="', canvas.toDataURL(), '"/>'].join(''));

                    var img = $('#image_input img')[0];
                    var canvas = document.createElement('canvas');

                    $('#image_input img').Jcrop({
                        bgColor: 'black',
                        bgOpacity: .6,
                        setSelect: [0, 0, 225, 225],
                        aspectRatio: 1,
                        onSelect: imgSelect,
                        onChange: imgSelect
                    });

                    function imgSelect(selection) {
                        canvas.width = canvas.height = 225;

                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, selection.x, selection.y, selection.w, selection.h, 0, 0, canvas.width, canvas.height);
                    
                        $('#image_code').attr('code', canvas.toDataURL());
                        // this.setState({imageCode: canvas.toDataURL()});
                    }
                }
            }
        })(file);
        reader.readAsDataURL(file);
    },
    render: function() {
        var currentUser = this.state.currentUser;
        if (!currentUser || !currentUser.id) {
            return React.createElement("div", null);
        }
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "jumbotron", 
                     style: {backgroundColor: "#666362"}}, 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", {className: "media"}, 
                            React.createElement("div", {className: "media-left col-sm-4 col-md-3"}, 
                                this.renderProfileImage(currentUser)
                            ), 
                            React.createElement("div", {className: "media-body col-sm-8 col-md-9", 
                                 style: {marginTop: "10px"}}, 
                                this.renderProfileInfo(currentUser)
                            ), 
                            React.createElement("hr", {className: "col-sm-12", style: {marginTop: "30px"}}), 
                            React.createElement("ul", {className: "inline-list text-center col-sm-12", 
                                style: {paddingLeft: "0px"}}, 
                                React.createElement("li", {className: "active col-xs-6 col-sm-6 col-md-6 col-lg-6"}, 
                                    React.createElement("a", {href: "#tab_picks", "data-toggle": "tab"}, "Picks"), 
                                    "  ", React.createElement("span", {className: "badge"}, this.state.currentUserPickCount)
                                ), 
                                React.createElement("li", {className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"}, 
                                    React.createElement("a", {href: "#tab_carpools", "data-toggle": "tab"}, "Carpools"), 
                                    "  ", React.createElement("span", {className: "badge"}, "5")
                                )
                            ), 
                            React.createElement("hr", {className: "col-sm-12"})
                        )
                    )
                ), 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "tab-content"}, 
                        React.createElement("div", {className: "tab-pane fadein-effect active col-xs-12 col-sm-8 col-sm-offset-2", 
                             id: "tab_picks"}, 
                            React.createElement(MyPickUpRequestPanel, {
                                currentUser: this.state.currentUser, 
                                requesters: this.state.requesters, 
                                pickups: this.state.pickups, 
                                handlePickupSubmit: this.handlePickupSubmit, 
                                handlePickRequesterCancel: this.handlePickRequesterCancel})
                        ), 
                        React.createElement("div", {className: "tab-pane fadein-effect", id: "tab_carpools"}, 
                            "tab_carpools"
                        )
                    )
                )
            )
        );
    },
});

React.render(
    React.createElement(MyProfilePanel, {
        myList: true, 
        loadCount: true, 
        loadAll: true, 
        pollInterval: 20000}),
    document.getElementById('content')
);