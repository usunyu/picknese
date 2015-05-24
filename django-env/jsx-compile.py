import os
from react import jsx

sub_paths = [
    '/picknese/static/picknese/home.jsx',
    '/picknese/static/picknese/post_request.jsx',
    '/pickup/static/pickup/component/FlightPickRequestCard.jsx',
    '/static/component/JumbotronPanel.jsx',
]

for sub_path in sub_paths:
    path = os.getcwd() + sub_path
    jsx.transform(path, js_path=path[0 : len(path) - 1])
