"""
Django settings for tournament_app project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
from . import db_conf
import os
import mimetypes
# Build paths inside the project like this: BASE_DIR / 'subdir'.

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')!)%f^$g(24tvk)23v^4x44=wep(&0(phmzu0r12$e=0emok@s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['139.59.16.180', '127.0.0.1', 'localhost']

# -- OTP configurations -- #
OTP_EXPIRE_TIME = 10   # in minutes
OTP_LENGTH = 6
OTP_TYPE = 1
'''
0 - numeric only
1 - alpha numeric (lowercase + uppercase + numeric)
2 - alpha numeric (lowercase + numeric)
3 - alpha numeric (uppercase + numeric)
'''

# -- Email Configurations -- #
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''

# Application definition
INSTALLED_APPS = [
    'adminlte3',
    'adminlte3_theme',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'login',
    'players',
    'tournament',
    'match',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    # 'django_admin_listfilter_dropdown',
    # 'admin_auto_filters',
#    'adminlte3',
    # Optional: Django admin theme (must be before django.contrib.admin)


]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication'
        # 'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES':[
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.AllowAny',
    ]
}
# Custom authentication model
AUTH_USER_MODEL = 'login.Account'
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',


]



CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
#    "https://http://139.59.16.180:8001/",
    # "https://sub.example.com",
    # "http://localhost:8080",
#    "http://127.0.0.1:8000"
]

ROOT_URLCONF = 'tournament_app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'tournament_app.menu_context_processor.applist',
                'django.contrib.messages.context_processors.messages',
                'tournament_app.context_processor.dashboardCount',
            ],
        },
    },
]

WSGI_APPLICATION = 'tournament_app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
base = db_conf.database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            # 'read_default_file': '/etc/mysql/my.cnf',
            'database': base.name,
            'host': base.host,
            'user' : base.user,
            'password': base.password,
        },
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

#STATICFILES_FINDERS = (
#    'django.contrib.staticfiles.finders.FileSystemFinder',
#    'django.contrib.staticfiles.finders.AppDirectoriesFinder',    #causes verbose duplicate notifications in django 1.9
#)

STATIC_URL = '/static/'
# MEDIA_ROOT = "/home/auriga/Desktop/ravi/team_capella/tournament_app/"
MEDIA_ROOT= "/var/www/html/ravi/backend/tournament_app/media"
MEDIA_URL = '/media/'
serverURL = "http://139.59.16.180:8001"

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
