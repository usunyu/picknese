import os
from react import jsx

PICKNESE_PATH 		= '/picknese/static/picknese/'
PICKUP_PATH 		= '/pickup/static/pickup/'
USERPROFILE_PATH 	= '/userprofile/static/userprofile/'

sub_paths = [
    PICKNESE_PATH + 'home.jsx',
    PICKNESE_PATH + 'post_request.jsx',
    PICKNESE_PATH + 'component/JumbotronPanel.jsx',
    PICKNESE_PATH + 'component/LoginModal.jsx',

    PICKUP_PATH + 'component/BaseRequestCard.jsx',
    PICKUP_PATH + 'component/FlightPickRequestCard.jsx',
    PICKUP_PATH + 'component/PickRequestCard.jsx',
    PICKUP_PATH + 'component/FlightPickUpCard.jsx',

    USERPROFILE_PATH + 'me.jsx',
]

for sub_path in sub_paths:
    path = os.getcwd() + sub_path
    jsx.transform(path, js_path=path[0 : len(path) - 1])
