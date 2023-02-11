from django.urls import path
from django.contrib import admin
from . import views


urlpatterns = [
    path('test/', views.test),
    path('student/', views.StudentView.as_view()),
    path('student/<pk>', views.StudentView.as_view()),
    path('login/', views.MyTokenObtainPairView.as_view()),
]
