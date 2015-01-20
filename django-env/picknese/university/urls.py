from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns

from university import views

urlpatterns = patterns('',
	url(r'^(?P<university_id>\d+)/$', 'university.views.university'),
	url(r'^$', 'university.views.university_list'),
	url(r'^api/$', views.UniversityList.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)