var MyProfilePanel = React.createClass({
    mixins: [LoadCurrentUserMixin],
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
                                
                                <div id="image_input"></div>
                                /*<img id="image_output" style={{border:"1px solid #000", visibility: "hidden"}}/>
                                <textarea id="image_source" style={{height:"100px", width:"200px", visibility: "hidden"}}></textarea>*/

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
                                <button type="button" className="btn btn-primary">Save Changes</button>
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
                    style={{marginLeft: "30px"}}>
                    {currentUser.first_name} {currentUser.last_name}
                </h3>
                <div className="container color-white hidden-xs">
                    <div className="col-sm-4 col-md-6">
                        <p className="normal-font-size">Shanghai Jiao Tong University, 2007-2011</p>
                        <p className="normal-font-size">University of Southern California, 2012-2014</p>
                    </div>
                    <div className="col-sm-4 col-md-6">
                        <p className="normal-font-size">Phone: +1 (650) 561-5620</p>
                        <p className="normal-font-size">WeChat: sunny77yu</p>
                        <p className="normal-font-size">QQ: 845863869</p>
                    </div>
                </div>
                <div className="hidden-sm hidden-md hidden-lg"
                     style={{marginLeft: "30px"}}>
                    <button type="button" className="btn btn-default btn-sm btn-on-image">
                        <i className="glyphicon glyphicon-home"></i>&nbsp; More Info
                    </button>
                </div>
            </div>
        );
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

                    $('#image_input').html(['<img src="', canvas.toDataURL(), '"/>'].join(''));

                    var img = $('#image_input img')[0];
                    var canvas = document.createElement('canvas');

                    $('#image_input img').Jcrop({
                        bgColor: 'black',
                        bgOpacity: .6,
                        setSelect: [0, 0, 100, 100],
                        aspectRatio: 1,
                        onSelect: imgSelect,
                        onChange: imgSelect
                    });

                    function imgSelect(selection) {
                        canvas.width = canvas.height = 100;

                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, selection.x, selection.y, selection.w, selection.h, 0, 0, canvas.width, canvas.height);
                    
                        $('#image_output').attr('src', canvas.toDataURL());
                        $('#image_source').text(canvas.toDataURL());
                        console.log(canvas.toDataURL());
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
                            <div className="media-left">
                                {this.renderProfileImage(currentUser)}
                            </div>
                            <div className="media-body"
                                 style={{marginTop: "10px"}}>
                                {this.renderProfileInfo(currentUser)}
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
    },
});

React.render(
    <MyProfilePanel />,
    document.getElementById('content')
);