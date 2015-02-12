Picknese
========

Social application for student studying abroad to help each other

##### Setup:
1. [Setup Django Environments:](http://usunyu.com/note/2014/12/06/setup-django/)

     ```$ sudo easy_install pip```
     
     ```$ sudo easy_install setuptools```
     
     ```$ sudo pip install virtualenv```
     
     ```$ sudo pip install mysql-python```
     
     ```$ sudo pip install django```
     
2. Install Third Part Apps:

     ```$ sudo pip install Pillow```
     
     ```$ sudo pip install django-bootstrap3 ```

3. [Install Django REST framework](http://www.django-rest-framework.org/#installation):

     ```$ pip install djangorestframework```

     ```$ pip install markdown```

     ```$ pip install django-filter```
     
4. [Create Picknese Database:](http://usunyu.com/note/2014/12/07/mysql-tips/)

     ```mysql> CREATE DATABASE picknese;```

     ```$ mysqldump -u root -p picknese > picknese.sql```

     ```$ mysql -u root -p picknese < picknese.sql```


5. Update ```picknese/settings.py``` DATABASES Part:

     ```
     DATABASES = {
          'default': {
               'ENGINE': 'django.db.backends.mysql',
               'NAME': 'picknese',
               'USER': 'Your Username Here',
               'PASSWORD': 'Your Password Here',
               'HOST': 'localhost',
               'PORT': '3306',
          }
     }
     ```
6. Migrate Database:

     ```$ python manage.py migrate```

7. Srart the Server:

     ```$ python manage.py runserver```
