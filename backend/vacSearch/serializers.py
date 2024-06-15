from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Resume, CustomUser, Vacancy, News


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'patronymic', 'role')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'patronymic')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            patronymic=validated_data.get('patronymic', '')
        )
        return user


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


# class FavoriteVacancySerializer(serializers.ModelSerializer):
#     vacancy = VacancySerializer(read_only=True)
#     vacancy_id = serializers.PrimaryKeyRelatedField(queryset=Vacancy.objects.all(), source='vacancy', write_only=True)
#
#     class Meta:
#         model = FavoriteVacancies
#         fields = ('id', 'user', 'vacancy', 'vacancy_id', 'added_at')
#         read_only_fields = ('user', 'added_at')


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
