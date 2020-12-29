from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Email must be set!')
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password):
        user = self.create_user(email, first_name, last_name, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=20, default=None, null=True)
    last_name = models.CharField(max_length=20, default=None, null=True)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    password = models.CharField(max_length=200, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='media/user/', default=None)
    age = models.IntegerField(default=None, null=True)
    GENDER_MALE = 0
    GENDER_FEMALE = 1
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female')]
    gender = models.IntegerField(default=None,choices=GENDER_CHOICES, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = UserAccountManager()

    def __str__(self):
        return self.email + " (" + self.first_name +" " + self.last_name+")"

    class Meta:
        verbose_name_plural = "Accounts"


class OTP(models.Model):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    otp = models.CharField(default=None, null=True, blank=True, max_length=20)
    time = models.DateTimeField()

class OTPConfiguration(models.Model):
    otp_length = models.IntegerField(default=6, null=False, blank=False)
    otp_type = models.IntegerField(default=1, null=False, blank=False)
    otp_expire_time = models.IntegerField(default=10, null=False, blank=False)
