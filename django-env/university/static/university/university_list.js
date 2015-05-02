var University = React.createClass({displayName: "University",
    render: function() {
        return (
            React.createElement("div", {className: "university"}, 
                React.createElement("h4", {className: "universityName"}, 
                    this.props.name
                ), 
                this.props.children
            )
        );
    }
});

var UniversityList = React.createClass({displayName: "UniversityList",
    render: function() {
        var filterText = this.props.filterText;
        var universities = this.props.data.map(function (university) {
            if (university.name.indexOf(filterText) === -1) {
                return;
            }
            return (
                React.createElement(University, {name: university.name}, 
                    React.createElement("p", null, university.shorthand), 
                    React.createElement("p", null, university.url), 
                    React.createElement("p", null, university.description)
                )
            );
        });
        return (
            React.createElement("div", {className: "universityList"}, 
                universities
            )
        );
    }
});

var UniversityForm = React.createClass({displayName: "UniversityForm",
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
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", placeholder: "University name", ref: "name"}), 
                React.createElement("input", {type: "text", placeholder: "Shorthand", ref: "shorthand"}), 
                React.createElement("input", {type: "text", placeholder: "Url", ref: "url"}), 
                React.createElement("input", {type: "submit", value: "Post"})
            )
        );
    }
});

var UniversitySearch = React.createClass({displayName: "UniversitySearch",
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
            React.createElement("form", null, 
                React.createElement("input", {type: "text", placeholder: "Search...", 
                       value: this.props.filterText, 
                       ref: "filterTextInput", 
                       onChange: this.handleChange})
            )
        );
    }
});

var UniversityPanel = React.createClass({displayName: "UniversityPanel",
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
            React.createElement("div", {className: "universityPanel"}, 
                React.createElement(UniversitySearch, {filterText: this.state.filterText, onUserInput: this.handleUserInput}), 
                React.createElement(UniversityList, {filterText: this.state.filterText, data: this.state.data}), 
                React.createElement(UniversityForm, {onUniversitySubmit: this.handleUniversitySubmit})
            )
        );
    }
});

React.render(
    React.createElement(UniversityPanel, {url: "api/", pollInterval: 20000}),
    document.getElementById('content')
);