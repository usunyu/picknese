Picknese
========

Social application for student studying abroad to help each other

##### Setup:
1. [Setup Django Environments:](http://usunyu.com/blog/2014/12/06/setup-django/)

     ```$ sudo easy_install pip```
     
     ```$ sudo easy_install setuptools```
     
     ```$ sudo pip install virtualenv```
     
     ```$ sudo pip install mysql-python```
     
     ```$ sudo pip install django```
     
2. Install Third Part Apps:

     ```$ sudo pip install Pillow```
     
     ```$ sudo pip install django-bootstrap3 ```
     
3. [Create Picknese Database:](http://usunyu.com/blog/2014/12/07/mysql-tips/)

     ```mysql> CREATE DATABASE picknese;```

4. Update ```picknese/settings.py``` DATABASES Part:

     ```
     DATABASES = {
          'default': {
               'ENGINE': 'django.db.backends.mysql',
               'NAME': 'picknese',
               'USER': 'root',
               'PASSWORD': 'Your Password here',
               'HOST': 'localhost',
               'PORT': '3306',
          }
     }
     ```
5. Migrate Database:

     ```$ python manage.py migrate```

6. Srart the Server:

     ```$ python manage.py runserver```
