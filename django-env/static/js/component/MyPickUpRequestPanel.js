/*
 * Parameters: currentUser, requesters, pickups
 * Callback: handlePickupSubmit, handlePickRequesterCancel
 */
var MyPickUpRequestPanel = React.createClass({
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
        var pickUps = [];
        for (var i = 0; i < this.props.pickups.length; i++) {
            var pickup = this.props.pickups[i];
            pickUps.push(
                <PickUp
                    key={pickup.id}
                    pickup={pickup} />
            );
        }
        return (
            <div>
                {pickRequesters}
                {pickUps}
            </div>
        );
    }
});