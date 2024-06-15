from rest_framework import generics, permissions, status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import Resume, Vacancy, CustomUser, News
from .permissions import IsApplicant, IsRecruiter
from .serializers import RegisterSerializer, ResumeSerializer, VacancySerializer, NewsSerializer


User = get_user_model()


class RegisterApplicantView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(role='applicant')


class RegisterRecruiterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(role='recruiter')


class ResumeCreateView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsApplicant]
    serializer_class = ResumeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ResumeListView(generics.ListAPIView):
    queryset = Resume.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]  # Разрешить доступ без аутентификации
    serializer_class = ResumeSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class VacancyCreateView(generics.CreateAPIView):
    queryset = Vacancy.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsRecruiter]
    serializer_class = VacancySerializer

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)


class VacancyUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vacancy.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsRecruiter]
    serializer_class = VacancySerializer


class VacancyArchiveView(generics.UpdateAPIView):
    queryset = Vacancy.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsRecruiter]

    def patch(self, request, *args, **kwargs):
        vacancy = self.get_object()
        vacancy.is_archived = True
        vacancy.save()
        return Response({'message': 'Vacancy archived successfully'}, status=status.HTTP_200_OK)


class VacancyListView(generics.ListAPIView):
    # может потребоваться фильтрация вакансий, например, по полю is_archived
    queryset = Vacancy.objects.filter(is_archived=False)
    serializer_class = VacancySerializer
    permission_classes = [permissions.AllowAny]  # Разрешить доступ без аутентификации


# class FavoriteVacancyCreateView(generics.CreateAPIView):
#     queryset = FavoriteVacancy.objects.all()
#     permission_classes = [permissions.IsAuthenticated, IsApplicant]
#     serializer_class = FavoriteVacancySerializer
#
#     def perform_create(self, serializer):
#         serializer.save(applicant=self.request.user)


# class FavoriteVacancyListCreateView(generics.ListCreateAPIView):
#     serializer_class = FavoriteVacancySerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def get_queryset(self):
#         return FavoriteVacancies.objects.filter(user=self.request.user)
#
#     def perform_create(self, serializer):
#         if FavoriteVacancies.objects.filter(user=self.request.user,
#                                             vacancy=serializer.validated_data['vacancy']).exists():
#             raise ValidationError('This vacancy is already in your favorites')
#         serializer.save(user=self.request.user)


# class FavoriteVacancyDestroyView(generics.DestroyAPIView):
#     serializer_class = FavoriteVacancySerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def get_queryset(self):
#         return FavoriteVacancies.objects.filter(user=self.request.user)


class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]  # Разрешить доступ без аутентификации


class NewsCreateView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticated, IsRecruiter]
