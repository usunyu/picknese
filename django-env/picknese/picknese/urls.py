from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = patterns('',
	# Examples:
	# url(r'^$', 'picknese.views.home', name='home'),
	# url(r'^blog/', include('blog.urls')),

	# home urls
	url(r'^$', 'picknese.views.index'),
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
	url(r'^', include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
