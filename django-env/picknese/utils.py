from time import time
from picknese import settings

def get_upload_file_name(instance, filename):
	# return settings.UPLOAD_FILE_PATTERN % (str(time()).replace('.','_'), filename)
	return settings.UPLOAD_FILE_PATTERN % filename