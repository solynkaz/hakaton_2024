from django.urls import path
from rest_framework_simplejwt.views import TokenObtainSlidingView, TokenRefreshSlidingView
from .views import ResumeCreateView, ResumeListView, \
    VacancyCreateView, RegisterApplicantView, RegisterRecruiterView, VacancyUpdateView, VacancyArchiveView, \
    VacancyListView, NewsListView, NewsCreateView

urlpatterns = [
    path('register/applicant/', RegisterApplicantView.as_view(), name='register_applicant'),
    path('register/recruiter/', RegisterRecruiterView.as_view(), name='register_recruiter'),
    path('token/', TokenObtainSlidingView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshSlidingView.as_view(), name='token_refresh'),
    # path('user/', UserDetailView.as_view(), name='user_detail'),
    path('resume/create/', ResumeCreateView.as_view(), name='resume_create'),
    path('resume/', ResumeListView.as_view(), name='resume_list'),
    path('vacancies/', VacancyListView.as_view(), name='vacancy_list'),
    path('vacancy/create/', VacancyCreateView.as_view(), name='vacancy_create'),
    # path('vacancy/like/', FavoriteVacancyCreateView.as_view(), name='vacancy_like'),
    # path('favorites/', FavoriteVacancyListCreateView.as_view(), name='favorite_list_create'),
    # path('favorites/<int:pk>/', FavoriteVacancyDestroyView.as_view(), name='favorite_destroy'),
    path('vacancy/<int:pk>/', VacancyUpdateView.as_view(), name='vacancy_detail'),
    path('vacancy/archive/<int:pk>/', VacancyArchiveView.as_view(), name='vacancy_archive'),
    path('vacancy/archive/<int:pk>/', VacancyArchiveView.as_view(), name='vacancy_archive'),
    path('news/', NewsListView.as_view(), name='news_list'),
    path('news/create/', NewsCreateView.as_view(), name='news_create'),

]
