from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'django_test.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),

	url(r'^$', 'university.views.universities'),
	url(r'^(?P<university_id>\d+)/$', 'university.views.university'),
	url(r'^create/$', 'university.views.create'),
	url(r'^edit/(?P<university_id>\d+)/$', 'university.views.edit'),
)
