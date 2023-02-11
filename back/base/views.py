from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers , status
from .models import Student
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
 
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

# Create your views here.

@api_view([ "GET"])
def test(req):
    return Response ("yo yo")


# @permission_classes([IsAuthenticated])
class StudentView(APIView):
    """
    This class handle the CRUD operations for Student
    """
    def get(self, request, pk=None):
        """
        Handle GET requests to return a list of Student objects or a single Student object
        """
        if pk:
            my_model = Student.objects.get(pk=pk)
            serializer = StudentSerializer(my_model)
            return Response(serializer.data)
        else:
            my_model = Student.objects.all()
            serializer = StudentSerializer(my_model, many=True)
        return Response(serializer.data)

    
    def post(self, request):
        """
        Handle POST requests to create a new Student object
        """
        # usr =request.user
        # print(usr)
        serializer = StudentSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        """
        Handle PUT requests to update an existing Student object
        """
        my_model = Student.objects.get(pk=pk)
        serializer = StudentSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        """
        Handle DELETE requests to delete a Student object
        """
        my_model = Student.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



#### אם רוצים לעשות premitoin לחלק אחד בclass
# def post(self, request):
#     if request.user.is_authenticated:
#         serializer = StudentSerializer(data=request.data, context={'user': request.user})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     else:
#         return Response("pleas login")