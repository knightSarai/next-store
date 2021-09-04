import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework import permissions
from rest_framework import authentication
from rest_framework.views import APIView


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return JsonResponse({'success': 'CSRF cookie set'})


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        data = self.request.data
        username = data.get("username")
        password = data.get("password")

        if username is None and password is None:
            return JsonResponse({"error: ": "Username and Password is needed"})

        user = authenticate(username=username, password=password)

        if not user:
            return JsonResponse({"error:": "User does not exist"})

        login(request, user)

        return JsonResponse({
            "message": "User logged in successfully",
        })


class CheckLoggedIn(APIView):
    authentication_class = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({"username": request.user.username})

