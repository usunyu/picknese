from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^home/(?P<university_id>\d+)/$', 'pickup.views.index'),
	url(r'^provider/(?P<university_id>\d+)/$', 'pickup.views.provider'),
)
