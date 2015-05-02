/*
 * Render: /pickup/requesters/1/
 */
var PickupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onPickupSubmit({
            picker : this.props.picker,
            description : this.refs.message.getDOMNode().value.trim(),
        }, this.props.pickRequester, this.props.modalID);
    },
    render: function() {
        var requester = this.props.pickRequester.requester;
        return (
            <form onSubmit={this.handleSubmit}>
                <img
                    className="img-circle box-shadow"
                    src={requester.profile.avatar}
                    style={{width: '90px', height: '90px', marginBottom: '15px'}} />
                <p><b>{requester.first_name} {requester.last_name}</b></p>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Thanks for your kindndess, leve a message?"
                        ref="message">
                    </textarea>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Confirm
                    </button>
                </div>
            </form>
        );
    }
});

var PickRequesterList = React.createClass({
    render: function() {
        var pickRequesters = [];
        for (var i = 0; i < this.props.requesters.length; i++) {
            var pickRequester = this.props.requesters[i];
            pickRequesters.push(
                <PickRequester
                    key={pickRequester.id}
                    pickRequester={pickRequester}
                    picker={this.props.currentUser}
                    handlePickupSubmit={this.props.handlePickupSubmit}
                    onPickRequesterCancel={this.props.handlePickRequesterCancel} />
            );
        }
        return (
            <div>
                <PickRequesterForm 
                    currentUser={this.props.currentUser}
                    university={this.props.university}
                    onPickRequesterSubmit={this.props.handlePickRequesterSubmit} />
                {pickRequesters}
            </div>
        );
    }
});

var PickRecord = React.createClass({
    render: function() {
        return (
            <li className="feed-item">
                <time className="date" dateTime={this.props.date_time}>{this.props.date_time}</time>
                <span className="text" >
                    <a href="#">{this.props.picker.first_name} {this.props.picker.last_name}</a>
                    &nbsp;will pick up&nbsp;
                    <a href="#">{this.props.pickee.first_name} {this.props.pickee.last_name}</a>
                </span>
            </li>
        );
    }
});

var PickRecordList = React.createClass({
    render: function() {
        var pickRecords = [];
        for (var i = 0; i < this.props.pickups.length; i++) {
            var pickup = this.props.pickups[i];
            var moment_datetime = moment(pickup.date_time, "YYYY-MM-DD HH:mm");
            pickRecords.push(
                <PickRecord
                    key={pickup.id}
                    pickee={pickup.pickee}
                    picker={pickup.picker}
                    date_time={moment_datetime.format("YYYY-MM-DD")} />
            );
        }
        return (
            <ol className="activity-feed">
                {pickRecords}
            </ol>
        );
    }
});

var PickRequesterPanel = React.createClass({
    mixins: [LoadCurrentUserMixin,
             LoadUniversityMixin,
             PickRequesterActionMixin,
             PickUpActionMixin],
    render: function() {
        if (this.state.university && this.state.currentUser && this.state.currentUserPickCount && production) {
            var pickRequestEvent = {
                university: this.state.university.name,
                referrer: document.referrer,
                keen: {
                    timestamp: new Date().toISOString()
                }
            };
            keen_client.addEvent("pickup_requester_list", pickRequestEvent, function(err, res){
                if (err) {
                    // there was an error!
                    // console.log('pickup_requester_list event keen logging error');
                } else {
                    // see sample response below
                    // console.log('pickup_requester_list event keen logging success');
                }
            });
        }
        return (
            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        currentUserPickCount={this.state.currentUserPickCount}
                        university={this.state.university} />
                    <div className="col-xs-12 col-sm-12 hidden-md hidden-lg">
                        <PickRequesterFormCollapseButton />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-8 col-md-7">
                    <PickRequesterList
                        currentUser={this.state.currentUser}
                        requesters={this.state.requesters}
                        university={this.state.university}
                        handlePickupSubmit={this.handlePickupSubmit}
                        handlePickRequesterSubmit={this.handlePickRequesterSubmit}
                        handlePickRequesterCancel={this.handlePickRequesterCancel} />
                </div>
                <div className="col-md-2 hidden-xs hidden-sm sidebar-offcanvas fadein-effect">
                    <PickRequesterFormCollapseButton />
                    <PickRecordList
                        pickups={this.state.pickups} />
                </div>
            </div>
        );
    }
});

React.render(
    <PickRequesterPanel
        loadCount={true}
        pollInterval={20000}/>,
    document.getElementById('content')
);