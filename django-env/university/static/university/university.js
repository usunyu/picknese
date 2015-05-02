var UniversityPanel = React.createClass({displayName: "UniversityPanel",
    mixins: [LoadCurrentUserMixin, 
             LoadUniversityMixin],
    render: function() {
        var university = this.state.university;
        if (!university) {
            return (React.createElement("div", null));
        }
        return (
            React.createElement("div", {className: "row col-md-12", 
                 style: {marginTop: '10px'}}, 
                React.createElement("div", {className: "col-xs-12 col-sm-4 col-md-3 fadein-effect"}, 
                    React.createElement(CurrentUserPanel, {
                        currentUser: this.state.currentUser, 
                        university: this.state.university})
                ), 
                React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-9 fadein-effect"}, 
                    React.createElement("p", null, React.createElement("b", null, "University:"), "  ", university.name), 
                    React.createElement("p", null, React.createElement("b", null, "Description:"), "  ", university.description), 
                    React.createElement("p", null, React.createElement("b", null, "Address:"), "  ", university.address, ",  ", university.state, ",  ", university.country), 
                    React.createElement("hr", {className: "col-xs-12 col-sm-12 col-md-12"})
                ), 
                React.createElement("div", {id: "map-canvas"})
            )
        );
    }
});

React.render(
    React.createElement(UniversityPanel, null),
    document.getElementById('content')
);