/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 */
var CURRENT_REQUEST = PICK_REQUEST;

var PostRequestForm = React.createClass({displayName: 'PostRequestForm',
    mixins: [UniversityActionMixin],
    componentDidUpdate: function() {
        var universities = [];
        var selected = [];
        for (var i = 0; i < this.state.universitySimpleList.length; i++) {
            var data = this.state.universitySimpleList[i];
            var u = {
                id: data.id,
                title: data.name,
                search: data.shorthand + data.name,
            };
            universities.push(u);
            if (data.id == university.id) {
                selected.push(data.id);
            }
        }
        // Bind university type hint
        $('#pick-request-university-select').selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false,
            onBlur: function() {
                // Hack! Selectize not work well with Bootstrap
                var element = $('#pick-request-university-select');
                var value = element.val();
                var borderDiv = element.parent().children()[1].children[0];
                if (!value) {
                    element.parent().parent().addClass("has-error");
                    borderDiv.style.borderColor = "#a94442";
                } else {
                    element.parent().parent().removeClass("has-error");
                    borderDiv.style.borderColor = "";
                }
            },
        });
        // Hack! Have to bind change event like this way, since
        // Bootstrap data-toggle="buttons" is conflict with onChange
        $('input[name="request-type"]').change(function() {
            // hide current request type input
            var elements = [];
            switch(CURRENT_REQUEST) {
                case PICK_REQUEST:
                    elements = document.getElementsByClassName("pick-request-input");
                    break;
                case FLIGHT_PICK_REQUEST:
                    elements = document.getElementsByClassName("flight-pick-request-input");
                    break;
                default:
                    break;
            }
            for (var i = 0; i < elements.length; ++i) {
                elements[i].style.display = "none";
            }
            CURRENT_REQUEST = parseInt($(this).attr('id'));
            // show the form according request type
            switch(CURRENT_REQUEST) {
                case PICK_REQUEST:
                    elements = document.getElementsByClassName("pick-request-input");
                    break;
                case FLIGHT_PICK_REQUEST:
                    elements = document.getElementsByClassName("flight-pick-request-input");
                    break;
                default:
                    break;
            }
            for (var i = 0; i < elements.length; ++i) {
                elements[i].className = elements[i].className + " fadein-effect";
                elements[i].style.display = "";
            }
        });
        // Prepare google map api
        var pickRequestStartInput = document.getElementById("pick-request-start-input");
        var pickRequestDestInput = document.getElementById("pick-request-dest-input");
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestStartInput, mapOptions);
        new google.maps.places.Autocomplete(pickRequestDestInput, mapOptions);
        // Prepare date selector
        var nowDate = new Date();
        var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
        $('#flight-pick-request-date-div').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: today,
        });
    },
    onInputFocusLose: function(event) {
        var targetID = event.target.id;
        var element = $('#' + targetID);
        // Check input error
        var inputError = false;
        switch(targetID) {
            case "flight-pick-request-flight-input":
                var value = this.refs.flightPickRequestFlightInput.getDOMNode().value.trim();
                if (!value) {
                    inputError = true;
                }
                break;
            case "pick-request-baggages-input":
                var value = this.refs.pickRequestBaggagesInput.getDOMNode().value.trim();
                if (!value || !isInt(value)) {
                    inputError = true;
                }
                break;
            case "flight-pick-request-date-input":
                var value = this.refs.flightPickRequestDateInput.getDOMNode().value.trim();
                if (!value) {
                    inputError = true;
                }
            case "pick-request-dest-input":
                var value = this.refs.pickRequestDestInput.getDOMNode().value.trim();
                if (!value) {
                    inputError = true;
                }
            case "pick-request-tip-input":
                var value = this.refs.pickRequestTipInput.getDOMNode().value.trim();
                if (!value || !isInt(value)) {
                    inputError = true;
                }
            default:
                break;
        }
        if (inputError) {
            element.parent().parent().addClass("has-error");
        } else {
            element.parent().parent().removeClass("has-error");
        }
        // Check if can enable submit button
        var enableSubmit = true;
        switch(CURRENT_REQUEST) {
            case PICK_REQUEST:
                break;
            case FLIGHT_PICK_REQUEST:
                var values = [];
                values.push(this.refs.pickRequestUniversitySelect.getDOMNode().value.trim());
                values.push(this.refs.flightPickRequestFlightInput.getDOMNode().value.trim());
                values.push(this.refs.pickRequestBaggagesInput.getDOMNode().value.trim());
                values.push(this.refs.flightPickRequestDateInput.getDOMNode().value.trim());
                values.push(this.refs.pickRequestDestInput.getDOMNode().value.trim());
                values.push(this.refs.pickRequestTipInput.getDOMNode().value.trim());
                for (var i = 0; i < values.length && enableSubmit; i++) {
                    var value = values[i];
                    if (!value) {
                        enableSubmit = false;
                    }
                }
                var intValues = [];
                intValues.push(this.refs.pickRequestBaggagesInput.getDOMNode().value.trim());
                intValues.push(this.refs.pickRequestTipInput.getDOMNode().value.trim());
                for (var i = 0; i < intValues.length && enableSubmit; i++) {
                    var value = intValues[i];
                    if (!isInt(value)) {
                        enableSubmit = false;
                    }
                }
                break;
            default:
                break;
        }
        var submitButton = document.getElementById("post-request-submit-button");
        if (enableSubmit) {
            submitButton.disabled = "";
        } else {
            submitButton.disabled = "disabled";
        }
    },
    render: function() {
        return (
            React.createElement("form", {className: "form-horizontal"}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I want to"), 
                    React.createElement("div", {className: "btn-group col-sm-10", 'data-toggle': "buttons"}, 
                        React.createElement("label", {className: "btn btn-white active"}, 
                            React.createElement("input", {
                                id: PICK_REQUEST, 
                                type: "radio", 
                                name: "request-type", 
                                defaultChecked: true}, 
                                React.createElement("i", {className: "glyphicon glyphicon-bookmark"}), " Asking for Pick Up"
                            )
                        ), 
                        React.createElement("label", {className: "btn btn-white"}, 
                            React.createElement("input", {
                                id: FLIGHT_PICK_REQUEST, 
                                type: "radio", 
                                name: "request-type"}, 
                                React.createElement("i", {className: "glyphicon glyphicon-plane"}), " Asking for Flight Pick Up"
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I study at"), 
                    React.createElement("div", {className: "col-sm-10"}, 
                        React.createElement("select", {id: "pick-request-university-select", ref: "pickRequestUniversitySelect"})
                    )
                ), 
                React.createElement("div", {className: "form-group flight-pick-request-input", style: {display: 'none'}}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I will take the flight"), 
                    React.createElement("div", {className: "col-sm-10"}, 
                        React.createElement("input", {
                            id: "flight-pick-request-flight-input", 
                            ref: "flightPickRequestFlightInput", 
                            type: "text", 
                            className: "form-control", 
                            onBlur: this.onInputFocusLose, 
                            placeholder: "What's your flight number?"})
                    )
                ), 
                React.createElement("div", {className: "form-group flight-pick-request-input", style: {display: 'none'}}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I have baggages"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {
                            id: "pick-request-baggages-input", 
                            ref: "pickRequestBaggagesInput", 
                            type: "number", 
                            className: "form-control", 
                            defaultValue: 1, 
                            onBlur: this.onInputFocusLose, 
                            placeholder: "How many bags do you have?"})
                    ), 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I will arrive at"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("div", {className: "input-group date", id: "flight-pick-request-date-div"}, 
                            React.createElement("input", {
                                id: "flight-pick-request-date-input", 
                                ref: "flightPickRequestDateInput", 
                                type: "text", 
                                className: "form-control", 
                                onBlur: this.onInputFocusLose, 
                                placeholder: "What's your arrival date?"}), 
                            React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                        )
                    )
                ), 
                React.createElement("div", {className: "form-group pick-request-input"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I need be picked at"), 
                    React.createElement("div", {className: "col-sm-10"}, 
                        React.createElement("input", {
                            id: "pick-request-start-input", 
                            type: "text", 
                            className: "form-control", 
                            placeholder: "Where you want to be picked up?"})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I want to go to"), 
                    React.createElement("div", {className: "col-sm-10"}, 
                        React.createElement("input", {
                            id: "pick-request-dest-input", 
                            ref: "pickRequestDestInput", 
                            type: "text", 
                            className: "form-control", 
                            onBlur: this.onInputFocusLose, 
                            placeholder: "Where you want to go?"})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I can pay tip"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {
                            id: "pick-request-tip-input", 
                            ref: "pickRequestTipInput", 
                            type: "number", 
                            defaultValue: 20, 
                            className: "form-control", 
                            onBlur: this.onInputFocusLose, 
                            placeholder: "Remunerated is good :)"})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                        React.createElement("button", {
                            id: "post-request-submit-button", 
                            type: "submit", 
                            disabled: "disabled", 
                            className: "btn btn-primary"}, 
                            "Continue"
                        )
                    )
                )
            )
        );
    }
});

React.render(
    React.createElement(PostRequestForm, {
        universityActionMinxinLoadSimpleList: true}),
    document.getElementById('content')
);

