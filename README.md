Picknese
========

I made this web application during I learn Django development, demo link: https://picknese.herokuapp.com/

Hope you enjoy :)

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

8. Specify dependencies with Pip:

     ```$ pip freeze > requirements.txt```
     
     ```$ pip install -r requirements.txt```

##### Databse:
1. [Reset App Database:](http://stackoverflow.com/questions/25606879/how-to-migrate-back-from-initial-migration-in-django-1-7)

     ```$ python manage.py migrate <app> zero```

2. [Heroku Connect:](https://devcenter.heroku.com/articles/heroku-postgresql)

     ```$ heroku pg:psql```

##### Heroku:
1. [Django Setup:](https://devcenter.heroku.com/articles/getting-started-with-django)

     ```$ heroku run python manage.py migrate```

     ```$ heroku run bash```

##### AWS S3: (Heroku deployment included this step)
1. [Update AWS S3 Server:](https://devcenter.heroku.com/articles/s3-upload-python)

     1. Set the correct URL helper: ```urls.js:```
     ```var production = true;```


     2. Enable the S3 settings: ```settings.py:```
     ```PRODUCTION = True```


     3. Upload to S3 Server:
     ```$ python manage.py collectstatic```
