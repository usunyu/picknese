from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns

from university import views, apis

urlpatterns = patterns('',
	url(r'^(?P<university_id>\d+)/$', 'university.views.university'),
	url(r'^$', 'university.views.university_list'),

	url(r'^api/$', apis.UniversityList.as_view()),
	url(r'^api/simplelist/$', apis.UniversitySimpleList.as_view()),
	url(r'^api/(?P<pk>\d+)/$', apis.UniversityDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)