from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

from djangoProject import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('username', email)  # Используем email в качестве username
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    ROLES = (
        ('applicant', 'Applicant'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLES, default='applicant')
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30, blank=True)

    groups = models.ManyToManyField(Group, related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Resume(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    position = models.CharField(max_length=100)
    summary = models.TextField(blank=True)
    experience = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    education = models.TextField(blank=True)
    courses = models.TextField(blank=True)

    def __str__(self):
        return f'{self.user} - {self.position}'


class Vacancy(models.Model):
    vacancy_name = models.CharField(max_length=100)
    vacancy_profile = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()
    location = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    recruiter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.vacancy_name


# class FavoriteVacancies(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     vacancy = models.ForeignKey(Vacancy, on_delete=models.CASCADE)
#     added_at = models.DateTimeField(auto_now_add=True, blank=True)
#
#     class Meta:
#         unique_together = ('user', 'vacancy')


class News(models.Model):
    title = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=100)
    text = models.TextField()
    recruiter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_archived = models.BooleanField(default=False)

    image = models.ImageField(upload_to='news_images/')

    def __str__(self):
        return self.title
