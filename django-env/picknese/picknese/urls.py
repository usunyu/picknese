from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'picknese.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),

	url(r'^admin/', include(admin.site.urls)),
	url(r'^$', 'picknese.views.index'),

	# user auth urls
	url(r'^accounts/login/$', 'picknese.views.login'),
	url(r'^accounts/auth/$', 'picknese.views.auth_view'),
	url(r'^accounts/logout/$', 'picknese.views.logout'),
	url(r'^accounts/signup/$', 'picknese.views.signup'),
)
