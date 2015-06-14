
var POST_REQUEST_PAGE = 1;
var UPDATE_REQUEST_PAGE = 2;

var CURRENT_PAGE = POST_REQUEST_PAGE;

var UniversitySelectInput = React.createClass({displayName: 'UniversitySelectInput',
    getElementID: function() {
        var id = "pick-request-university-select";
        if (CURRENT_PAGE === UPDATE_REQUEST_PAGE) {
            id = id + "-" + this.props.id;
        }
        return id;
    },
    updateComponent: function() {
        var universities = [];
        var selected = [];
        for (var i = 0; i < this.props.universitySimpleList.length; i++) {
            var data = this.props.universitySimpleList[i];
            var u = {
                id: data.id,
                title: data.name,
                search: data.shorthand + data.name,
            };
            universities.push(u);
            if (typeof university !== 'undefined' && data.id == university.id) {
                selected = [data.id];
            }
        }
        // Check if user already set up university
        if (selected.length == 0 && !jQuery.isEmptyObject(current_user) && current_user.university_id) {
            selected = [current_user.university_id];
        }
        if (this.props.defaultValue) {
            selected = [this.props.defaultValue];
        }
        // Bind university type hint
        var id = this.getElementID();
        $("#" + id).selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false,
            onBlur: function() {
                // Hack! Selectize not work well with Bootstrap
                var element = $("#" + id);
                var value = element.val();
                var borderDiv = element.parent().children()[1].children[0];
                if (!value) {
                    element.parent().addClass("has-error");
                    borderDiv.style.borderColor = "#a94442";
                } else {
                    element.parent().removeClass("has-error");
                    borderDiv.style.borderColor = "";
                }
                if (CURRENT_PAGE === POST_REQUEST_PAGE) {
                    enablePostRequestSubmit();
                }
            },
        });
    },
    componentDidMount: function() {
        // Hack, figure out React Lifecycle.
        if (CURRENT_PAGE === UPDATE_REQUEST_PAGE) {
            this.updateComponent();
        }
    },
    componentDidUpdate: function() {
        if (CURRENT_PAGE === POST_REQUEST_PAGE) {
            this.updateComponent();
        }
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "University"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("select", {id: this.getElementID()})
                )
            )
        );
    }
});

var FlightNumberTextInput = React.createClass({displayName: 'FlightNumberTextInput',
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Flight"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: "flight-pick-request-flight-input", 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.props.onBlur, 
                        placeholder: "What's your flight number?"})
                )
            )
        );
    }
});

var FlightBaggagesAndDateInput = React.createClass({displayName: 'FlightBaggagesAndDateInput',
    componentDidMount: function() {
        // Prepare date time selector
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $('#flight-pick-request-date-div').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: today,
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Arrival Date"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("div", {className: "input-group date", id: "flight-pick-request-date-div"}, 
                        React.createElement("input", {
                            id: "flight-pick-request-date-input", 
                            type: "text", 
                            className: "form-control", 
                            defaultValue: this.props.defaultDate, 
                            onBlur: this.props.onBlur, 
                            placeholder: "What's your arrival date?"}), 
                        React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                    )
                ), 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Baggages"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("input", {
                        id: "pick-request-baggages-input", 
                        type: "number", 
                        className: "form-control", 
                        defaultValue: this.props.defaultBaggages, 
                        onBlur: this.props.onBlur, 
                        placeholder: "How many bags do you have?"})
                )
            )
        );
    }
});

var PickLocationTextInput = React.createClass({displayName: 'PickLocationTextInput',
    componentDidMount: function() {
        // Prepare google map api
        var pickRequestStartInput = document.getElementById("pick-request-start-input");
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestStartInput, mapOptions);
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Pick Location"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: "pick-request-start-input", 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.props.onBlur, 
                        placeholder: "Where you want to be picked up?"})
                )
            )
        );
    }
});

var PickTimeTextInput = React.createClass({displayName: 'PickTimeTextInput',
    componentDidMount: function() {
        // Prepare date time selector
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $('#pick-request-time-div').datetimepicker({
            minDate: today,
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Pick Time"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("div", {className: "input-group date", id: "pick-request-time-div"}, 
                        React.createElement("input", {
                            id: "pick-request-time-input", 
                            type: "text", 
                            className: "form-control", 
                            defaultValue: this.props.defaultValue, 
                            onBlur: this.props.onBlur, 
                            placeholder: "What's your pick time?"}), 
                        React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                    )
                )
            )
        );
    }
});

var PickDestTextInput = React.createClass({displayName: 'PickDestTextInput',
    componentDidMount: function() {
        // Prepare google map api
        var pickRequestDestInput = document.getElementById("pick-request-dest-input");
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestDestInput, mapOptions);
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Destination"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: "pick-request-dest-input", 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.props.onBlur, 
                        placeholder: "Where you want to go?"})
                )
            )
        );
    }
});

var PickTipNumberInput = React.createClass({displayName: 'PickTipNumberInput',
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Tip"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("input", {
                        id: "pick-request-tip-input", 
                        type: "number", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.props.onBlur, 
                        placeholder: "Remunerated is good :)"})
                )
            )
        );
    }
});

var MessageTextareaInput = React.createClass({displayName: 'MessageTextareaInput',
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Note"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("textarea", {
                        id: "pick-request-desc-textarea", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        rows: "3", 
                        placeholder: "Anything you want to mention?"}
                    )
                )
            )
        );
    }
});