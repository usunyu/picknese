var UserProfileInfoForm = React.createClass({displayName: "UserProfileInfoForm",
    componentDidUpdate: function() {
        var universityOptions = [];
        for (var i = 0; i < this.props.universitySimpleList.length; i++) {
            var data = this.props.universitySimpleList[i];
            // console.log(data);
            var option = {
                id: data.id,
                title: data.name,
                search: data.shorthand + data.name,
            };
            universityOptions.push(option);
        }

        $('.select-universities').selectize({
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universityOptions,
            create: false
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("form", null, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-xs-12"}, 
                            React.createElement("div", {className: "control-group"}, 
                                React.createElement("label", null, "Your Current University:"), 
                                React.createElement("select", {className: "select-universities"})
                            )
                        ), 
                        React.createElement("div", {className: "col-xs-1", 
                             style: {marginTop: "10px"}}, 
                            "From"
                        ), 
                        React.createElement("div", {className: "col-xs-4"}, 
                            React.createElement("select", {className: "form-control"}, 
                                React.createElement("option", null, "2009"), 
                                React.createElement("option", null, "2010"), 
                                React.createElement("option", null, "2012"), 
                                React.createElement("option", null, "2013")
                            )
                        ), 
                        React.createElement("div", {className: "col-xs-1", 
                             style: {marginTop: "10px"}}, 
                            "To"
                        ), 
                        React.createElement("div", {className: "col-xs-4"}, 
                            React.createElement("select", {className: "form-control"}, 
                                React.createElement("option", null, "2009"), 
                                React.createElement("option", null, "2010"), 
                                React.createElement("option", null, "2012"), 
                                React.createElement("option", null, "2013")
                            )
                        )
                    ), 
                    React.createElement("div", {className: "row", style: {marginTop: "30px"}}, 
                        React.createElement("div", {className: "col-xs-12"}, 
                            React.createElement("div", {className: "control-group"}, 
                                React.createElement("label", null, "Your Previous University:"), 
                                React.createElement("select", {className: "select-universities"})
                            )
                        ), 
                        React.createElement("div", {className: "col-xs-1", 
                             style: {marginTop: "10px"}}, 
                            "From"
                        ), 
                        React.createElement("div", {className: "col-xs-4"}, 
                            React.createElement("select", {className: "form-control"}, 
                                React.createElement("option", null, "2009"), 
                                React.createElement("option", null, "2010"), 
                                React.createElement("option", null, "2012"), 
                                React.createElement("option", null, "2013")
                            )
                        ), 
                        React.createElement("div", {className: "col-xs-1", 
                             style: {marginTop: "10px"}}, 
                            "To"
                        ), 
                        React.createElement("div", {className: "col-xs-4"}, 
                            React.createElement("select", {className: "form-control"}, 
                                React.createElement("option", null, "2009"), 
                                React.createElement("option", null, "2010"), 
                                React.createElement("option", null, "2012"), 
                                React.createElement("option", null, "2013")
                            )
                        )
                    )
                )
            )
        );
    }
});