var MyProfilePanel = React.createClass({
    mixins: [LoadCurrentUserMixin,
             PickRequesterActionMixin,
             PickUpActionMixin],
    renderProfileImage: function(currentUser) {
        var profileImage = currentUser.profile.avatar ? currentUser.profile.avatar : getProfileDefaultPic();
        return (
            <div>
                <div className="show-image">
                    <img className="media-object box-shadow hidden-xs"
                         src={profileImage}
                         style={{width: '225px', height: '225px'}} />
                    <button type="button" className="btn btn-default btn-lg btn-on-image"
                            data-toggle="modal" data-target="#imageUploadModal">
                        <i className="glyphicon glyphicon-camera"></i>&nbsp; Change Photo
                    </button>
                </div>
                <img className="media-object box-shadow hidden-sm hidden-md hidden-lg"
                     src={profileImage}
                     style={{width: '100px', height: '100px'}} />
                <div className="modal fade" id="imageUploadModal" tabIndex="-1" role="dialog" 
                     aria-labelledby="imageUploadModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="imageUploadModalLabel">Change Profile Photo</h4>
                            </div>
                            <hr style={{marginTop: "-10px"}}/>
                            <div className="modal-body">
                                <div id="image_input">
                                    <img className="media-object box-shadow"
                                         src={profileImage}
                                         style={{width: '225px', height: '225px'}} />
                                </div>
                                <div id="image_code" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                <span className="btn btn-primary btn-file">
                                    Browse
                                    <input type="file" id="image_file" 
                                           onClick={this.clickUploadImage}
                                           onChange={this.changeUploadImage}
                                           ref="imageFile" />
                                </span>
                                <button type="button" className="btn btn-primary" 
                                        onClick={this.submitUploadImage}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderProfileInfo: function(currentUser) {
        return (
            <div>
                <h3 className="media-heading color-white"
                    style={{marginLeft: "15px"}}>
                    {currentUser.first_name} {currentUser.last_name}
                </h3>
                <div className="hidden-xs">
                    <div className="col-md-5 button-hide-wrap">
                        <p className="normal-font-size color-white"><b>Current:</b></p>
                        <p className="normal-font-size color-white">Facebook, 2014-present</p>
                        <p className="normal-font-size color-white"><b>Previous:</b></p>
                        <p className="normal-font-size color-white">Shanghai Jiao Tong University, 2007-2011</p>
                        <p className="normal-font-size color-white">University of Southern California, 2012-2014</p>
                        <div className="button-hide-div">
                            {/* update info button */}
                            <button
                                type="button"
                                className="btn btn-default btn-xs"
                                data-toggle="modal"
                                data-target="#update-info-modal">
                                <i className="glyphicon glyphicon-pencil"></i>&nbsp;
                                Update Info
                            </button>
                            {/* update info modal */}
                            <div className="modal fade" 
                                 id="update-info-modal"
                                 tabIndex="-1" role="dialog"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            <h4 className="modal-title">Update Your Info</h4>
                                        </div>
                                        <hr style={{marginTop: "-10px"}}/>
                                        <div className="modal-body">
                                            Add update info form here
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-offset-4 col-md-3 button-hide-wrap">
                        <p className="normal-font-size color-white"><b>Contact:</b></p>
                        <p className="normal-font-size color-white">Phone: +1 (650) 561-5620</p>
                        <p className="normal-font-size color-white">WeChat: sunny77yu</p>
                        <p className="normal-font-size color-white">QQ: 845863869</p>
                        <p className="normal-font-size color-white">Email: usunyu@sina.com</p>
                        <div className="button-hide-div">
                            <button
                                type="button"
                                className="btn btn-default btn-xs">
                                <i className="glyphicon glyphicon-pencil"></i>&nbsp;
                                Update Contact
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden-sm hidden-md hidden-lg"
                     style={{marginLeft: "15px"}}>
                    <button type="button" className="btn btn-default btn-sm btn-on-image">
                        <i className="glyphicon glyphicon-home"></i>&nbsp; More Info
                    </button>
                </div>
            </div>
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
            return <div></div>;
        }
        return (
            <div>
                <div className="jumbotron"
                     style={{backgroundColor: "#666362"}} >
                    <div className="container" >
                        <div className="media">
                            <div className="media-left col-sm-4 col-md-3">
                                {this.renderProfileImage(currentUser)}
                            </div>
                            <div className="media-body col-sm-8 col-md-9"
                                 style={{marginTop: "10px"}}>
                                {this.renderProfileInfo(currentUser)}
                            </div>
                            <hr className="col-sm-12" style={{marginTop: "30px"}} />
                            <ul className="inline-list text-center col-sm-12"
                                style={{paddingLeft: "0px"}}>
                                <li className="active col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <a href="#tab_picks" data-toggle="tab">Picks</a>
                                    &nbsp;&nbsp;<span className="badge">{this.state.currentUserPickCount}</span>
                                </li>
                                <li className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <a href="#tab_carpools" data-toggle="tab">Carpools</a>
                                    &nbsp;&nbsp;<span className="badge">5</span>
                                </li>
                            </ul>
                            <hr className="col-sm-12" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane fadein-effect active col-xs-12 col-sm-8 col-sm-offset-2"
                             id="tab_picks">
                            <MyPickUpRequestPanel
                                currentUser={this.state.currentUser}
                                requesters={this.state.requesters}
                                pickups={this.state.pickups}
                                handlePickupSubmit={this.handlePickupSubmit}
                                handlePickRequesterCancel={this.handlePickRequesterCancel} />
                        </div>
                        <div className="tab-pane fadein-effect" id="tab_carpools">
                            tab_carpools
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

React.render(
    <MyProfilePanel
        myList={true}
        loadCount={true}
        loadAll={true}
        pollInterval={20000} />,
    document.getElementById('content')
);