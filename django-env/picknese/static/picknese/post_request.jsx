/*
 * Template Parameters
 * --------------------------------------------------
 * @university
 */
var CURRENT_REQUEST = PICK_REQUEST;

var PostRequestForm = React.createClass({
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
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">I want to</label>
                    <div className="btn-group col-sm-10" data-toggle="buttons">
                        <label className="btn btn-white active">
                            <input
                                id={PICK_REQUEST}
                                type="radio"
                                name="request-type"
                                defaultChecked >
                                <i className="glyphicon glyphicon-bookmark"></i>&nbsp;Asking for Pick Up
                            </input>
                        </label>
                        <label className="btn btn-white">
                            <input
                                id={FLIGHT_PICK_REQUEST}
                                type="radio"
                                name="request-type" >
                                <i className="glyphicon glyphicon-plane"></i>&nbsp;Asking for Flight Pick Up
                            </input>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">I study at</label>
                    <div className="col-sm-10">
                        <select id="pick-request-university-select" ref="pickRequestUniversitySelect" />
                    </div>
                </div>
                <div className="form-group flight-pick-request-input" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I will take the flight</label>
                    <div className="col-sm-10">
                        <input
                            id="flight-pick-request-flight-input"
                            ref="flightPickRequestFlightInput"
                            type="text"
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="What's your flight number?" />
                    </div>
                </div>
                <div className="form-group flight-pick-request-input" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I have baggages</label>
                    <div className="col-sm-4">
                        <input 
                            id="pick-request-baggages-input"
                            ref="pickRequestBaggagesInput"
                            type="number"
                            className="form-control"
                            defaultValue={1}
                            onBlur={this.onInputFocusLose}
                            placeholder="How many bags do you have?" />
                    </div>
                    <label className="col-sm-2 control-label">I will arrive at</label>
                    <div className="col-sm-4">
                        <div className='input-group date' id='flight-pick-request-date-div'>
                            <input
                                id="flight-pick-request-date-input"
                                ref="flightPickRequestDateInput"
                                type='text'
                                className="form-control"
                                onBlur={this.onInputFocusLose}
                                placeholder="What's your arrival date?" />
                            <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                </div>
                <div className="form-group pick-request-input">
                    <label className="col-sm-2 control-label">I need be picked at</label>
                    <div className="col-sm-10">
                        <input
                            id="pick-request-start-input"
                            type="text"
                            className="form-control"
                            placeholder="Where you want to be picked up?" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">I want to go to</label>
                    <div className="col-sm-10">
                        <input
                            id="pick-request-dest-input"
                            ref="pickRequestDestInput"
                            type="text"
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="Where you want to go?" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">I can pay tip</label>
                    <div className="col-sm-4">
                        <input
                            id="pick-request-tip-input"
                            ref="pickRequestTipInput"
                            type="number"
                            defaultValue={20}
                            className="form-control"
                            onBlur={this.onInputFocusLose}
                            placeholder="Remunerated is good :)" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button
                            id="post-request-submit-button"
                            type="submit"
                            disabled="disabled"
                            className="btn btn-primary">
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        );
    }
});

React.render(
    <PostRequestForm 
        universityActionMinxinLoadSimpleList={true} />,
    document.getElementById('content')
);

