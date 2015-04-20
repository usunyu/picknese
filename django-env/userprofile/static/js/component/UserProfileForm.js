var UserProfileInfoForm = React.createClass({
    render: function() {
        return (
            <div>
                <form>
                    <div className="row">
                        <div className="col-xs-12">
                            <input type="text" className="form-control" placeholder="Your Current University" />
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                        <div className="col-xs-1">
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
                            <input type="text" className="form-control" placeholder="Your Previous University" />
                        </div>
                        <div className="col-xs-4">
                            <select className="form-control">
                                <option>2009</option>
                                <option>2010</option>
                                <option>2012</option>
                                <option>2013</option>
                            </select>
                        </div>
                        <div className="col-xs-1">
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