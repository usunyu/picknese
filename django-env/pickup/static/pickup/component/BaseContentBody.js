var BaseContentBody = React.createClass({displayName: 'BaseContentBody',
	componentDidMount: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    render: function() {
    	var layout = this.props.layout;
        var content = [];
        for (var key in layout.body) {
            var value = layout.body[key];
            content.push(
                React.createElement("p", {key: key, className: layout.body[key].class}, 
                    React.createElement("i", {
                        className: layout.body[key].icon, 
                        'data-toggle': "tooltip", 
                        'data-placement': "left", 
                        title: layout.body[key].title}
                    ), " ", layout.body[key].content
                )
            );
        }
        return (
        	React.createElement("div", null, 
        		content
        	)
        );
    }
});