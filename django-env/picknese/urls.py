from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin

from picknese import views, apis

urlpatterns = patterns('',
    # index urls
    url(r'^$', 'picknese.views.index'),
    # home urls
    url(r'^home/(?P<university_id>\d+)/$', views.home),
    url(r'^home/api/(?P<university_id>\d+)/$', apis.HomeFeedList.as_view()),
    # post request
    url(r'^home/(?P<university_id>\d+)/new/$', views.post_request),
    # pickup urls
    url(r'^pickup/', include('pickup.urls')),
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
    # rest framework urls
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
