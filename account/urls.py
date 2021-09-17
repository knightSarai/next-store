from django.urls import path

from . import views

app_name = "account"

urlpatterns = [
    path('csrf/', views.GetCSRFToken.as_view(), name="api-csrf"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutViw.as_view(), name="logout"),
    path('signup/', views.SignUpView.as_view(), name="signup"),
    path('check-logged-in/', views.CheckLoggedIn.as_view(), name="checkloggedin"),

]
