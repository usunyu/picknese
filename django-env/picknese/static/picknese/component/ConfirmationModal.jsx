var InputConfirmationModal = React.createClass({
    render: function() {
        return (
            <div
                id={this.props.id_prefix + this.props.feed.id}
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className={"modal-header " + this.props.background_color}>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                style={{color: "white"}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" style={{color: "white"}}>
                                {this.props.title}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <textarea
                                    id={this.props.input_id}
                                    className="form-control"
                                    rows="3"
                                    placeholder={this.props.placeholder}>
                                </textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.props.onSubmit}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var WarningConfirmationModal = React.createClass({
    render: function() {
        return (
            <div
                id={"feed-" + this.props.feed.id}
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header background-color-warning">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                style={{color: "white"}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" style={{color: "white"}}>
                                {this.props.title}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <p>{this.props.text}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.props.onConfirm}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});