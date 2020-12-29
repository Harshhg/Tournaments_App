from rest_framework import serializers
from .models import Account, OTP
from tournament_app.settings import serverURL

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email', 'password']
        # extra_kwargs = {
        #     'password': {'write_only': True}
        # }
    def save(self):
        account = Account(
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            email=self.validated_data['email'],
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account

class UserSerializer(serializers.ModelSerializer):
    profile_imageurl = serializers.SerializerMethodField()
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'email','profile_imageurl','age','gender']
    def get_profile_imageurl(self,account):
        if account.profile_image == "":      # if profile image is None
            return None
        else:
            profile_image = account.profile_image.url
            return serverURL + profile_image

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=300, required=True)
    password = serializers.CharField(required=True, write_only=True)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'profile_image','age','gender']

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = ['email', 'otp', 'time']