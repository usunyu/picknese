var PickupForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onPickupSubmit({
            picker : this.props.picker,
            pickee : this.props.pickRequester.requester,
            university : this.props.pickRequester.university,
            pickType : this.props.pickRequester.pick_type,
            flight : this.props.pickRequester.flight,
            start : this.props.pickRequester.start,
            price : this.props.pickRequester.price,
            destination : this.props.pickRequester.destination,
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
            if (!pickRequester.confirmed) {
                pickRequesters.push(
                    <PickRequester
                        key={pickRequester.id}
                        pickRequester={pickRequester}
                        picker={this.props.currentUser}
                        handlePickupSubmit={this.props.handlePickupSubmit}
                        onPickRequesterCancel={this.props.handlePickRequesterCancel} />
                );
            }
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
                <time className="date" dateTime="9-22">Sep 22</time>
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
            pickRecords.push(
                <PickRecord
                    key={pickup.id}
                    pickee={pickup.pickee}
                    picker={pickup.picker}
                    // TODO: add real time in model
                    time={""} />
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
        return (
            <div className="row col-md-12"
                 style={{marginTop: '10px'}}>
                <div className="col-xs-12 col-sm-4 col-md-3 fadein-effect">
                    <CurrentUserPanel
                        currentUser={this.state.currentUser}
                        currentUserPickCount={this.state.currentUserPickCount}
                        university={this.state.university} />
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
                <div className="col-xs-12 col-sm-6 col-md-2 sidebar-offcanvas fadein-effect">
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