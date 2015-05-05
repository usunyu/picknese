var JumbotronPanel = React.createClass({displayName: 'JumbotronPanel',
    mixins: [LoadUniversityMixin],
    render: function() {
        var university = this.state.university;
        if (!university) {
            return (React.createElement("div", null));
        }
        return (
            React.createElement("div", {style: {marginTop: '10px'}}, 
                React.createElement("div", {className: "box-wrapper"}, 
                    React.createElement("div", {className: "box-blur-wrapper"}, 
                        React.createElement("div", {
                            className: "jumbotron box-shadow box-blur", 
                            style: {background: 'url(' + getUniversityWide(university.shorthand) + ') center', minHeight: '200px'}}
                        ), 
                        React.createElement("div", {
                            className: "jumbotron box-shadow box-blur box-blur-overlay", 
                            style: {background: 'url(' + getUniversityWide(university.shorthand) + ') center', minHeight: '200px'}}
                        )
                    )
                ), 

                React.createElement("div", {className: "container", style: {marginTop: '-140px'}}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-6 col-sm-3 col-md-3 col-lg-2"}, 
                            React.createElement("img", {
                                src: getUniversityLogo(university.shorthand), 
                                className: "img-thumbnail img-responsive img-center box-shadow-light", 
                                style: {width: '150px'}})
                        ), 
                        React.createElement("div", {className: "col-sm-9 col-md-9 col-lg-9 hidden-xs", style: {marginTop: '38px'}}, 
                            React.createElement("h3", {className: "color-white text-shadow"}, university.name)
                        ), 
                        React.createElement("div", {className: "col-xs-6 visible-xs", style: {marginTop: '38px'}}, 
                            React.createElement("h6", {className: "color-white text-shadow"}, university.name)
                        ), 
                        React.createElement("div", {className: "col-xs-12 col-md-10"}, 
                            React.createElement("ul", {className: "nav nav-tabs"}, 
                                React.createElement("li", {role: "presentation", className: checkActiveTab(getPickupBaseURL())}, 
                                    React.createElement("a", {href: getPickupURL(university.id)}, "Pick Up")
                                ), 
                                React.createElement("li", {role: "presentation"}, 
                                    React.createElement("a", {href: "#"}, "Carpool")
                                ), 
                                React.createElement("li", {role: "presentation", className: checkActiveTab(getUniversityBaseURL())}, 
                                    React.createElement("a", {href: getUniversityURL(university.id)}, "About")
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(JumbotronPanel, null),
    document.getElementById('jumbotron')
);
