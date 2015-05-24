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
                    <select className="select-universities col-sm-10"></select>
                </div>
                <div className="form-group flight-pick-request-input" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I'll take the flight</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="What's your flight number?" />
                    </div>
                </div>
                <div className="form-group flight-pick-request-input" style={{display: 'none'}}>
                    <label className="col-sm-2 control-label">I have baggages</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" placeholder="How many bags do you have?" />
                    </div>
                    <label className="col-sm-2 control-label">I'll arrive at</label>
                    <div className="col-sm-4">
                        <div className='input-group date' id='flight-pick-request-date-input'>
                            <input
                                type='text'
                                className="form-control"
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
                            type="text"
                            className="form-control"
                            placeholder="Where you want to go?" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">I can pay tip</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" placeholder="Remunerated is good :)" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-primary">Continue</button>
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

