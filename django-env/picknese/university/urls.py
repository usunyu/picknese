from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^home/(?P<university_id>\d+)/$', 'university.views.university'),
)
