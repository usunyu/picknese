"""
Django settings for picknese project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import dj_database_url
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

PROJECT_DIRECTORY = os.getcwd()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '(l3twho*_7sw4m&2w2be-)c-+rsc4qseh2dtai(!!&4w4(ufd5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

# python manage.py collectstatic
# Set True to manually deploy static and media files to S3
# Don't forget to set correct static & media url of front end
DEPLOY_S3 = False

# Allow all host headers
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'picknese',
    'storages',
    'bootstrap3',
    'userprofile',
    'university',
    'pickup',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'picknese.urls'

WSGI_APPLICATION = 'picknese.wsgi.application'

# Parse database configuration from $DATABASE_URL
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
DATABASES = {
    'default': dj_database_url.config()
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
STATIC_ROOT = ''
# STATIC_ROOT = os.path.join(PROJECT_DIRECTORY, 'static')

STATIC_URL = '/static/'

# Satic assets that aren't tied to a particular app
STATICFILES_DIRS = (
    os.path.join(PROJECT_DIRECTORY, 'static'),
)

# Customizing your project's templates
TEMPLATE_DIRS = [os.path.join(BASE_DIR, 'templates')]

# Custom User Profile
AUTH_PROFILE_MODULE = 'userprofile.UserProfile'

# Uploaded file destination
# UPLOAD_FILE_PATTERN = "media/uploaded_files/%s_%s"
UPLOAD_FILE_PATTERN = "media/uploaded_files/%s"

# https://docs.djangoproject.com/en/1.7/ref/settings/#media-root
MEDIA_ROOT = ''

# https://docs.djangoproject.com/en/1.7/ref/settings/#media-url
MEDIA_URL = '/media/'

# http://www.django-rest-framework.org/
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}

# Try load local sttings
try:
    if not DEPLOY_S3:
        from local_settings import *
        print "Loading local settings..."
    else:
        print "Ready to deploy to S3..."
except ImportError as e:
    print "Loading production settings..."

AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_PRELOAD_METADATA = True

#Storage on S3 settings are stored as os.environs to keep settings.py clean
if not DEBUG or DEPLOY_S3:
    STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
    S3_URL = 'https://%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME
    STATIC_URL = S3_URL
    MEDIA_URL = S3_URL + 'media/'
