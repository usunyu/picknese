var University = React.createClass({
    render: function() {
        return (
            <div className="university">
                <h4 className="universityName">
                    {this.props.name}
                </h4>
                {this.props.children}
            </div>
        );
    }
});

var UniversityList = React.createClass({
    render: function() {
        var filterText = this.props.filterText;
        var universities = this.props.data.map(function (university) {
            if (university.name.indexOf(filterText) === -1) {
                return;
            }
            return (
                <University name={university.name}>
                    <p>{university.shorthand}</p>
                    <p>{university.url}</p>
                    <p>{university.description}</p>
                </University>
            );
        });
        return (
            <div className="universityList">
                {universities}
            </div>
        );
    }
});

var UniversityForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.refs.name.getDOMNode().value.trim();
        var shorthand = this.refs.shorthand.getDOMNode().value.trim();
        var url = this.refs.url.getDOMNode().value.trim();
        if (!name || !shorthand || !url) {
            return;
        }
        this.props.onUniversitySubmit({
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

var UniversitySearch = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
            <form>
                <input type="text" placeholder="Search..." 
                       value={this.props.filterText}
                       ref="filterTextInput"
                       onChange={this.handleChange} />
            </form>
        );
    }
});

var UniversityPanel = React.createClass({
    loadUniversitiesFromServer: function() {
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
    handleUniversitySubmit: function(university) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: university,
            success: function(data) {
                universities = this.state.data;
                universities.push(data);
                this.setState({data: universities});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: [],
            filterText: ''
        };
    },
    componentDidMount: function() {
        this.loadUniversitiesFromServer();
        setInterval(this.loadUniversitiesFromServer, this.props.pollInterval);
    },
    handleUserInput: function(filterText) {
        this.setState({filterText: filterText});
    },
    render: function() {
        return (
            <div className="universityPanel">
                <UniversitySearch filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                <UniversityList filterText={this.state.filterText} data={this.state.data} />
                <UniversityForm onUniversitySubmit={this.handleUniversitySubmit} />
            </div>
        );
    }
});

React.render(
    <UniversityPanel url="api/" pollInterval={20000}/>,
    document.getElementById('content')
);