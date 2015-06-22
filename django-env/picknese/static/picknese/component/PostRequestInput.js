
var POST_REQUEST_PAGE   = 1;
var UPDATE_REQUEST_PAGE = 2;

var CURRENT_PAGE = POST_REQUEST_PAGE;

var UNIVERSITY_SELECT_ID    = "pick-request-university-select";
var START_INPUT_ID          = "pick-request-start-input";
var TIME_INPUT_ID           = "pick-request-time-input";
var DEST_INPUT_ID           = "pick-request-dest-input";
var TIP_INPUT_ID            = "pick-request-tip-input";
var DESC_TEXT_ID            = "pick-request-desc-textarea";
var FLIGHT_INPUT_ID         = "flight-pick-request-flight-input";
var BAGS_INPUT_ID           = "pick-request-baggages-input";
var DATE_INPUT_ID           = "flight-pick-request-date-input";

var REQUEST_SUBMIT_BUTTON_ID = "post-request-submit-button";

// Request Type => [Inputs Required]
var RequestTypeInputMap = {};
RequestTypeInputMap[PICK_REQUEST] = [
    UNIVERSITY_SELECT_ID,
    START_INPUT_ID,
    TIME_INPUT_ID,
    DEST_INPUT_ID,
    TIP_INPUT_ID,
];
RequestTypeInputMap[FLIGHT_PICK_REQUEST] = [
    UNIVERSITY_SELECT_ID,
    FLIGHT_INPUT_ID,
    BAGS_INPUT_ID,
    DATE_INPUT_ID,
    DEST_INPUT_ID,
    TIP_INPUT_ID,
];

// Input => Input Valid Type
var InputValidTypeMap = {};
InputValidTypeMap[BAGS_INPUT_ID] = "Integer";
InputValidTypeMap[TIP_INPUT_ID] = "Integer";

function checkInputError(id, type) {
    // Check input error
    var element = $('#' + id);
    var value = element.val().trim();
    var inputError = value == "";
    switch(type) {
        case "Integer":
            if (!isInt(value)) { inputError = true; }
            break;
        default:
            break;
    };
    if (inputError) {
        element.parent().addClass("has-error");
    } else {
        element.parent().removeClass("has-error");
    }
    return inputError;
}

function enablePostRequestSubmit(id) {
    var feed_type;
    if (CURRENT_PAGE === POST_REQUEST_PAGE) {
        feed_type = CURRENT_REQUEST;
    } else {
        feed_type = id.split("-")[0];
    }
    var enableSubmit = true;
    var requiredInputs = RequestTypeInputMap[feed_type];
    for (var i = 0; i < requiredInputs.length && enableSubmit; i++) {
        var value = $("#" + requiredInputs[i] + id).val().trim();
        if (!value) { enableSubmit = false; }
        var validType = InputValidTypeMap[requiredInputs[i]];
        switch(validType) {
            case "Integer":
                if (!isInt(value)) { enableSubmit = false; }
                break;
            default:
                break;
        };
    }
    var submitButton = document.getElementById(REQUEST_SUBMIT_BUTTON_ID + id);
    if (enableSubmit) {
        submitButton.disabled = "";
    } else {
        submitButton.disabled = "disabled";
    }
    return enableSubmit;
}

var UniversitySelectInput = React.createClass({displayName: 'UniversitySelectInput',
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
        var sub_id = trueValue(this.props.id);
        $("#" + UNIVERSITY_SELECT_ID + sub_id).selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false,
            onBlur: function() {
                // Hack! Selectize not work well with Bootstrap
                var element = $("#" + UNIVERSITY_SELECT_ID + sub_id);
                var borderDiv = element.parent().children()[1].children[0];
                if (checkInputError(UNIVERSITY_SELECT_ID + sub_id, '')) {
                    borderDiv.style.borderColor = "#a94442";
                } else {
                    borderDiv.style.borderColor = "";
                }
                enablePostRequestSubmit(sub_id);
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
                    React.createElement("select", {id: UNIVERSITY_SELECT_ID + trueValue(this.props.id)})
                )
            )
        );
    }
});

var FlightNumberTextInput = React.createClass({displayName: 'FlightNumberTextInput',
    onDateInputFocusLose: function(event) {
        checkInputError(FLIGHT_INPUT_ID + trueValue(this.props.id), '');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Flight"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: FLIGHT_INPUT_ID + trueValue(this.props.id), 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.onDateInputFocusLose, 
                        placeholder: "What's your flight number?"})
                )
            )
        );
    }
});

var FlightBaggagesAndDateInput = React.createClass({displayName: 'FlightBaggagesAndDateInput',
    componentDidMount: function() {
        // Prepare date time selector
        if (CURRENT_PAGE === POST_REQUEST_PAGE) {
            var nowDate = new Date();
            var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
            $('#flight-pick-request-date-div').datetimepicker({
                format: 'MM/DD/YYYY',
                minDate: today,
            });
        }
        if (CURRENT_PAGE == UPDATE_REQUEST_PAGE) {
            $('#flight-pick-request-date-div').datetimepicker({format: 'MM/DD/YYYY'});
        }
    },
    onDateInputFocusLose: function(event) {
        checkInputError(DATE_INPUT_ID + trueValue(this.props.id), '');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    onBagInputFocusLose: function(event) {
        checkInputError(BAGS_INPUT_ID + trueValue(this.props.id), 'Integer');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Arrival Date"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("div", {className: "input-group date", id: "flight-pick-request-date-div"}, 
                        React.createElement("input", {
                            id: DATE_INPUT_ID + trueValue(this.props.id), 
                            type: "text", 
                            className: "form-control", 
                            defaultValue: this.props.defaultDate, 
                            onBlur: this.onDateInputFocusLose, 
                            placeholder: "What's your arrival date?"}), 
                        React.createElement("span", {className: "input-group-addon"}, React.createElement("span", {className: "glyphicon glyphicon-calendar"}))
                    )
                ), 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Baggages"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("input", {
                        id: BAGS_INPUT_ID + trueValue(this.props.id), 
                        type: "number", 
                        className: "form-control", 
                        defaultValue: this.props.defaultBaggages, 
                        onBlur: this.onBagInputFocusLose, 
                        placeholder: "How many bags do you have?"})
                )
            )
        );
    }
});

var PickLocationTextInput = React.createClass({displayName: 'PickLocationTextInput',
    componentDidMount: function() {
        // Prepare google map api
        var pickRequestStartInput = document.getElementById(START_INPUT_ID + trueValue(this.props.id));
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestStartInput, mapOptions);
    },
    onInputFocusLose: function(event) {
        checkInputError(START_INPUT_ID + trueValue(this.props.id), '');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Pick Location"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: START_INPUT_ID + trueValue(this.props.id), 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.onInputFocusLose, 
                        placeholder: "Where you want to be picked up?"})
                )
            )
        );
    }
});

var PickTimeTextInput = React.createClass({displayName: 'PickTimeTextInput',
    componentDidMount: function() {
        // Prepare date time selector
        if (CURRENT_PAGE === POST_REQUEST_PAGE) {
            var nowDate = new Date();
            var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
            $('#pick-request-time-div').datetimepicker({
                minDate: today,
            });
        }
        if (CURRENT_PAGE == UPDATE_REQUEST_PAGE) {
            $('#pick-request-time-div').datetimepicker();
        }
    },
    onInputFocusLose: function(event) {
        checkInputError(TIME_INPUT_ID + trueValue(this.props.id), '');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Pick Time"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("div", {className: "input-group date", id: "pick-request-time-div"}, 
                        React.createElement("input", {
                            id: TIME_INPUT_ID + trueValue(this.props.id), 
                            type: "text", 
                            className: "form-control", 
                            defaultValue: this.props.defaultValue, 
                            onBlur: this.onInputFocusLose, 
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
        var pickRequestDestInput = document.getElementById(DEST_INPUT_ID + trueValue(this.props.id));
        var mapOptions = {componentRestrictions: {country: 'us'}};
        new google.maps.places.Autocomplete(pickRequestDestInput, mapOptions);
    },
    onInputFocusLose: function(event) {
        checkInputError(DEST_INPUT_ID + trueValue(this.props.id), '');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Destination"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("input", {
                        id: DEST_INPUT_ID + trueValue(this.props.id), 
                        type: "text", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.onInputFocusLose, 
                        placeholder: "Where you want to go?"})
                )
            )
        );
    }
});

var PickTipNumberInput = React.createClass({displayName: 'PickTipNumberInput',
    onInputFocusLose: function(event) {
        checkInputError(TIP_INPUT_ID + trueValue(this.props.id), 'Integer');
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Tip"), 
                React.createElement("div", {className: "col-sm-4"}, 
                    React.createElement("input", {
                        id: TIP_INPUT_ID + trueValue(this.props.id), 
                        type: "number", 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        onBlur: this.onInputFocusLose, 
                        placeholder: "Remunerated is good :)"})
                )
            )
        );
    }
});

var MessageTextareaInput = React.createClass({displayName: 'MessageTextareaInput',
    onInputFocusLose: function(event) {
        enablePostRequestSubmit(trueValue(this.props.id));
    },
    render: function() {
        return (
            React.createElement("div", {className: "form-group", style: {display: this.props.display}}, 
                React.createElement("label", {className: "col-sm-2 control-label"}, "Note"), 
                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("textarea", {
                        id: DESC_TEXT_ID + trueValue(this.props.id), 
                        className: "form-control", 
                        defaultValue: this.props.defaultValue, 
                        rows: "3", 
                        onBlur: this.onInputFocusLose, 
                        placeholder: "Anything you want to mention?"}
                    )
                )
            )
        );
    }
});