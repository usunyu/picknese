var UserProfileInfoForm = React.createClass({
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
            <div>
                <form>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="control-group">
                                <label>Your Current University:</label>
                                <select className="select-universities"></select>
                            </div>
                        </div>
                        <div className="col-xs-1"
                             style={{marginTop: "10px"}}>
                            From
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                        <div className="col-xs-1"
                             style={{marginTop: "10px"}}>
                            To
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: "30px"}}>
                        <div className="col-xs-12">
                            <div className="control-group">
                                <label>Your Previous University:</label>
                                <select className="select-universities"></select>
                            </div>
                        </div>
                        <div className="col-xs-1"
                             style={{marginTop: "10px"}}>
                            From
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                        <div className="col-xs-1"
                             style={{marginTop: "10px"}}>
                            To
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});