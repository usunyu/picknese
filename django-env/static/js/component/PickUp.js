/*
 * Parameters: pickup
 */
var PickUp = React.createClass({
    render: function() {
        var picker = this.props.pickup.picker;
        var pickee = this.props.pickup.pickee;
        var pickType = this.props.pickup.pick_type;
        return (
            <div className="panel panel-success fadein-effect">
                <div className="panel-heading" />
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href="#">
                                <img className="img-circle box-shadow"
                                     src={picker.profile.avatar ? picker.profile.avatar : getProfileDefaultPic()}
                                     style={{width: '50px', height: '50px'}} />
                            </a>
                            <hr className="invisible-hr" />
                            <div className="text-center">
                                <i className="glyphicon glyphicon-ok-sign"></i>
                            </div>
                            <hr className="invisible-hr" />
                            <a href="#">
                                <img className="img-circle box-shadow"
                                     src={pickee.profile.avatar ? pickee.profile.avatar : getProfileDefaultPic()}
                                     style={{width: '50px', height: '50px'}} />
                            </a>
                        </div>
                        <div className="media-body">
                            <p className="media-heading">
                                <i className="glyphicon glyphicon-user"></i>
                                <b> {picker.first_name} {picker.last_name}</b>
                                &nbsp;will offer&nbsp;
                                <b> {pickee.first_name} {pickee.last_name}</b>
                                &nbsp;a&nbsp;
                                {pickType == 1 ?
                                    <span className="label label-success">Flight</span> :
                                    <span className="label label-primary">General</span>}
                                &nbsp;pick up
                            </p>
                            <p>
                                {pickType == 1 ?
                                    <div><i className="glyphicon glyphicon-plane"></i> {this.props.pickup.flight}</div> :
                                    <div><i className="glyphicon glyphicon-globe"></i> {this.props.pickup.start}</div>}
                            </p>
                            <p><i className="glyphicon glyphicon-map-marker"></i> {this.props.pickup.destination}</p>
                            <p><i className="glyphicon glyphicon-credit-card"></i> ${this.props.pickup.price}</p>
                            <p><i className="glyphicon glyphicon-comment"></i> {this.props.pickup.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});