/*
 * Parameters: @UniversityActionMinxinLoadUniversitySimpleList => load all university simple info form server
 */
var UniversityActionMixin = {
    loadUniversitySimpleListFromServer: function() {
        $.ajax({
            url: getUniversitySimpleListAPI(),
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                this.setState({universitySimpleList: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(
                    getUniversitySimpleListAPI(),
                    status,
                    err.toString()
                );
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            universitySimpleList: [],
        };
    },
    componentDidMount: function() {
        if (this.props.universityActionMinxinLoadUniversitySimpleList) {
            this.loadUniversitySimpleListFromServer();
        }
    },
}