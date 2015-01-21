var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h4 className="commentAuthor">
                    {this.props.name}
                </h4>
                {this.props.children}
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment name={comment.name}>
                    {comment.description}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.refs.name.getDOMNode().value.trim();
        var shorthand = this.refs.shorthand.getDOMNode().value.trim();
        var url = this.refs.url.getDOMNode().value.trim();
        if (!name || !shorthand || !url) {
            return;
        }
        this.props.onCommentSubmit({
            name: name,
            shorthand: shorthand,
            url: url,
        });
        this.refs.name.getDOMNode().value = '';
        this.refs.shorthand.getDOMNode().value = '';
        this.refs.url.getDOMNode().value = '';
        return;
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="University name" ref="name" />
                <input type="text" placeholder="Shorthand" ref="shorthand" />
                <input type="text" placeholder="Url" ref="url" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                comments = this.state.data;
                comments.push(data);
                this.setState({data: comments});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h3>Universities</h3>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

React.render(
    <CommentBox url="api/" pollInterval={20000}/>,
    document.getElementById('content')
);