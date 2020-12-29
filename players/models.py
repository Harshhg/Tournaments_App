from django.db import models

class Players(models.Model):
    name = models.CharField(max_length=50, default=None, null=False)
    email = models.EmailField(verbose_name="email", max_length=60)
    gender = models.CharField(max_length=6, default=None, null=False)
    age = models.IntegerField(max_length=3, null=False)
    profile_image = models.ImageField(upload_to='media/players/',default=None, null=True)
    user = models.ForeignKey('login.Account', on_delete=models.DO_NOTHING, blank=True)

    def __str__(self):
        return self.name.title()

    class Meta:
        verbose_name_plural = "Players"