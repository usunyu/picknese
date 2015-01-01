from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'picknese.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),

	# home page
	url(r'^$', 'picknese.views.index'),
	url(r'^home/(?P<university_id>\d+)/$', 'picknese.views.home'),
	# admin usrls
	url(r'^admin/', include(admin.site.urls)),
	# university urls
	url(r'^universities/', include('university.urls')),
	# user auth urls
	url(r'^accounts/login/$', 'picknese.views.login'),
	url(r'^accounts/auth/$', 'picknese.views.auth_view'),
	url(r'^accounts/logout/$', 'picknese.views.logout'),
	url(r'^accounts/signup/$', 'picknese.views.signup'),
	# user profile urls
	url(r'^accounts/', include('userprofile.urls')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
