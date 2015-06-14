var BaseContentBody = React.createClass({
	componentDidMount: function() {
        $('[data-toggle="tooltip"]').tooltip();
    },
    render: function() {
    	var layout = this.props.layout;
        var content = [];
        for (var key in layout.body) {
            var value = layout.body[key];
            content.push(
                <p key={key} className={layout.body[key].class} >
                    <i 
                        className={layout.body[key].icon}
                        data-toggle="tooltip"
                        data-placement="left"
                        title={layout.body[key].title}>
                    </i> {layout.body[key].content}
                </p>
            );
        }
        return (
        	<div>
        		{content}
        	</div>
        );
    }
});