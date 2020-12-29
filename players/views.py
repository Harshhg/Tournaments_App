from django.shortcuts import render
from . models import Players
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, viewsets
from .serializers import PlayerDetailSerializer
from tournament.serializers import PlayerSerializer, PlayerListSerializer
from rest_framework.response import Response

class PlayerViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    # get method to list all players
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def get_players(self, request):
        response={}
        try:
            id = request.GET.get('id')
            # queryset = Players.objects.filter(user=request.user, name__icontains=name)
            if id:
                queryset = Players.objects.filter(user=request.user, id=id)
                serializer = PlayerDetailSerializer(queryset,context={"request": request}, many=True)
            else:
                queryset = Players.objects.filter(user_id=request.user.id)
                serializer = PlayerListSerializer(queryset,context={"request": request}, many=True)
            if queryset:
                response['data'] = serializer.data
                response['message'] = 'Successfull'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 0
                response['exception_status'] = 0
            else:
                response['data'] = ''
                response['message'] = 'No Players found'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 0
                response['exception_status'] = 0
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)

    # post request to add players
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_players(self, request):
        response = {}
        try:
            serializer = PlayerSerializer(data=request.data)
            email = request.data.get('email')     # composite key
            queryset = Players.objects.filter(email=email, user=request.user.id)
            if queryset:    # player already added
                response['data'] = ''
                response['message'] = 'Player already exist'
                response['status'] = status.HTTP_200_OK
                response['error_status'] = 1
                response['exception_status'] = 0
            else:
                if serializer.is_valid():
                    serializer.save(user=request.user)
                    response['data'] = ''
                    response['message'] = 'Player Successfully Added'
                    response['status'] = status.HTTP_201_CREATED
                    response['error_status'] = 0
                    response['exception_status'] = 0
                else:
                    response['data'] = ''
                    response['message'] = serializer.errors
                    response['status'] = status.HTTP_201_CREATED
                    response['error_status'] = 1
                    response['exception_status'] = 0
            return Response(response)
        except Exception as e:
            response['data'] = ''
            response['message'] = str(e)
            response['status'] = status.HTTP_500_INTERNAL_SERVER_ERROR
            response['error_status'] = 0
            response['exception_status'] = 1
        return Response(response)
