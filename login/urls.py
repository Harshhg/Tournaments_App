from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from .views import registration_view, login_view, ProfileViewset, generate_otp, verify_otp, change_password

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('profile', ProfileViewset.as_view({'get': 'retrieve_profile'})),
    path('profile/update/', ProfileViewset.as_view({'put': 'profile_update'})),
    path('login/', login_view, name="login"),
    path('register/', registration_view, name="register"),
    path('sendOTP/', generate_otp, name="Generate OTP"),
    path('verifyOTP/', verify_otp, name="Verify OTP"),
    path('changePassword/', change_password, name="Change Password"),


    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', views.obtain_auth_token),
]
