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
        $('.select-universities').selectize({
            items : selected,
            maxItems: 1,
            valueField: 'id',
            labelField: 'title',
            searchField: 'search',
            options: universities,
            create: false
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
        $('#flight-pick-request-date-input').datetimepicker({
            format: 'MM/DD/YYYY',
            minDate: today,
        });
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
                    React.createElement("select", {className: "select-universities col-sm-10"})
                ), 
                React.createElement("div", {className: "form-group flight-pick-request-input", style: {display: 'none'}}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I'll take the flight"), 
                    React.createElement("div", {className: "col-sm-10"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "What's your flight number?"})
                    )
                ), 
                React.createElement("div", {className: "form-group flight-pick-request-input", style: {display: 'none'}}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I have baggages"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "How many bags do you have?"})
                    ), 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I'll arrive at"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                        React.createElement("div", {className: "input-group date", id: "flight-pick-request-date-input"}, 
                            React.createElement("input", {
                                type: "text", 
                                className: "form-control", 
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
                            type: "text", 
                            className: "form-control", 
                            placeholder: "Where you want to go?"})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {className: "col-sm-2 control-label"}, "I can pay tip"), 
                    React.createElement("div", {className: "col-sm-5"}, 
                        React.createElement("input", {type: "text", className: "form-control", placeholder: "Remunerated is good :)"})
                    )
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-sm-offset-2 col-sm-10"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "Continue")
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

