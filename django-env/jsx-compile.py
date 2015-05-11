from react import jsx

root_path = '/Users/yusun/Repositories/Picknese/django-env/'

sub_paths = [
	'static/component/JumbotronPanel.jsx',
]

for sub_path in sub_paths:
	path = root_path + sub_path
	jsx.transform(path, js_path=path[0 : len(path) - 1])
