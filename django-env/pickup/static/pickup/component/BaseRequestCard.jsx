var BaseRequestCard = React.createClass({
    mixins: [MessageActionMixin],
    handleRequestCancel: function() {
        this.props.onCancel(this.props.feed, this.props.mutateCallback);
    },
    handleContactMessageSubmit: function() {
        var feed = this.props.feed;
        var message = $("#contact-textarea").val().trim();
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact-'));
        if (message == '') {
            submitButton.disabled = "disabled";
            return;
        }
        this.handleMessageSubmit({
            sender      : current_user.id,
            receiver    : feed.requester.id,
            message     : $("#contact-textarea").val().trim(),
        }, this.handleContactMessageCallback);
        $("#contact-textarea").val("");
    },
    handleContactMessageCallback: function() {
        $("#" + this.getActionButtonModalID("feed-contact-")).modal('hide');
    },
    onContactMessageModalFocus: function() {
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact-'));
        submitButton.disabled = "disabled";
    },
    onContactMessageInputChange: function() {
        var message = $("#contact-textarea").val().trim();
        var submitButton = document.getElementById(this.getActionButtonModalID('submit-feed-contact-'));
        if (message == '') {
            submitButton.disabled = "disabled";
        } else {
            submitButton.disabled = "";
        }
    },
    getActionButtonModalID: function(prefix) {
        if (jQuery.isEmptyObject(current_user)) {
            return "login-modal";
        } else {
            var feed = this.props.feed;
            return prefix + feed.id;
        }
    },
    getActionButton: function() {
        var feed = this.props.feed;
        {/* If it is user's own request */}
        if (current_user.id == feed.requester.id) {
            return (
                <div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    <button
                        type="button"
                        className="btn btn-warning"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#feed-" + feed.id}>
                        <i className="glyphicon glyphicon-remove"></i>&nbsp;
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}}
                        data-toggle="modal"
                        data-target={"#update-modal-" + feed.feed_type + "-" + feed.id} >
                        <i className="glyphicon glyphicon-edit"></i>&nbsp;
                        Update
                    </button>
                    {/* Cancel Button Modal */}
                    <WarningConfirmationModal
                        feed={feed}
                        title={"Cancel Confirmation"}
                        text={"Are you sure want to cancel this request?"}
                        onConfirm={this.handleRequestCancel} />
                    {/* Update Button Modal */}
                    <div
                        id={"update-modal-" + feed.feed_type + "-" + feed.id}
                        className="modal fade"
                        tabIndex="-1"
                        role="dialog"
                        aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header" style={{backgroundColor: "#0084B4"}}>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        style={{color: "white"}}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h5 className="modal-title" style={{color: "white"}}>
                                        Update Your Request
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    {this.props.updateForm}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <hr style={{marginTop: '5px', marginBottom: '15px'}} />
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{float: 'right'}}
                        data-toggle="modal"
                        data-target={"#" + this.getActionButtonModalID('feed-offer-')}>
                        <i className="glyphicon glyphicon-heart"></i>&nbsp;
                        Offer Help
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{float: 'right', marginRight: '10px'}}
                        data-toggle="modal"
                        data-target={"#" + this.getActionButtonModalID('feed-contact-')}>
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;
                        Contact
                    </button>
                    {/* Offer Button Modal */}
                    <InputConfirmationModal
                        feed={feed}
                        id_prefix={"feed-offer-"}
                        background_color={"background-color-success"}
                        title={"Offer Confirmation"}
                        input_id={"pick-up-desc-textarea"}
                        placeholder={"Thanks for taking this request, anything you want to mention?"}
                        onSubmit={this.props.onSubmit}
                        submit_text={"Confirm"} />
                    {/* Contact Button Modal */}
                    <InputConfirmationModal
                        feed={feed}
                        id_prefix={"feed-contact-"}
                        background_color={"background-color-primary"}
                        title={"Send Message"}
                        input_id={"contact-textarea"}
                        placeholder={"Anything you want to say?"}
                        onSubmit={this.handleContactMessageSubmit}
                        submit_text={"Send"}
                        onInputChange={this.onContactMessageInputChange} />
                </div>
            );
        }
    },
    render: function() {
        var feed = this.props.feed;
        var layout = this.props.layout;
        return (
            <div className="panel clearfix fadein-effect home-feed-panel-div">
                <div className="panel-heading" style={{overflow: "auto"}}>
                    <a href="#" className="home-feed-sm-profile">
                        <img
                            className="image-circular"
                            src={
                                feed.requester.profile.avatar ? 
                                feed.requester.profile.avatar : getProfileDefaultPic()
                            }
                            style={{width: '40px', height: '40px'}} />
                    </a>
                    <span className="home-feed-title">{layout.heading.user} {layout.heading.verb} <b style={{color: "#286090"}}><i className={layout.heading.icon}></i>{layout.heading.action}</b></span>
                    <div style={{float: "right"}}>
                        <span style={{fontSize: "80%", marginRight: "8px", marginTop: "3px"}}>{moment(feed.created).format("YYYY-MM-DD hh:mm A")}</span>
                        <a href={getHomeFeedURL(feed.university.id)}>
                            <img
                                className="image-circular"
                                src={getUniversityLogo(feed.university.shorthand)}
                                style={{width: '25px', height: '25px'}} />
                        </a>
                    </div>
                </div>
                <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#" className="home-feed-md-profile">
                                <img
                                    className="image-circular"
                                    src={
                                        feed.requester.profile.avatar ? 
                                        feed.requester.profile.avatar : getProfileDefaultPic()
                                    }
                                    style={{width: '60px', height: '60px', marginTop: '-60px', marginLeft: '-7px'}} />
                            </a>
                        </div>
                        <div className="media-body">
                            <div className="row">
                                <BaseContentBody
                                    layout={layout} />
                            </div>
                        </div>
                    </div>
                    {this.getActionButton()}
                </div>
            </div>
        );
    }
});