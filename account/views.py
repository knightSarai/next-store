from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import permissions, authentication
from rest_framework.views import APIView

from .serializers import UserSerializer


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    def get(self, request):
        return JsonResponse({'success': 'CSRF cookie set'})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class SignUpView(APIView):
    def post(self, request):
        try:
            data = self.request.data
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            password_confirm = data.get("passwordConfirm")

            if password != password_confirm:
                print(password)
                print(password_confirm)
                return JsonResponse({"error: ": "Passwords don't match"}, status=500)

            User.objects.create_user(username=username, email=email, password=password)

            return JsonResponse({"message": "User created in successfully",})

        except Exception as e:
            return JsonResponse({"message": f"{e!r}"}, status=500)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LoginView(APIView):
    def post(self, request):
        try:
            data = self.request.data
            username = data.get("username")
            password = data.get("password")

            if username is None or password is None:
                return JsonResponse({"error: ": "Username and Password is needed"})

            user = authenticate(username=username, password=password)

            if not user:
                return JsonResponse({"error:": "User does not exist"})

            login(request, user)
            user_serializer = UserSerializer(user)
            return JsonResponse({
                "message": "User logged in successfully",
                "user": user_serializer.data
            })

        except Exception as e:
            return JsonResponse({"message": f"{e!r}"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LogoutViw(APIView):
    authentication_class = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get(request):
        try:
            logout(request)
            return JsonResponse({"success": "User logged out successfully"})
        except Exception as e:
            return JsonResponse({"error": f"User logged out error {e!r}"})


@method_decorator(csrf_protect, name="dispatch")
class CheckLoggedIn(APIView):
    authentication_class = [authentication.SessionAuthentication]
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def get(request):
        req_user = request.user.username
        if not req_user:
            return JsonResponse({"user": None, "message": "No logged in user found"})
        user = User.objects.get(username=req_user)
        user_serializer = UserSerializer(user)
        return JsonResponse({"user": user_serializer.data})
