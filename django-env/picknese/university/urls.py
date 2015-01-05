from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^(?P<university_id>\d+)/$', 'university.views.university'),
)
