from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_weather_data
from .models import MonthlyData, SeasonalData, AnnualData
from .serializers import (
    FetchWeatherDataSerializer,
    MonthlyDataSerializer,
    SeasonalDataSerializer,
    AnnualDataSerializer,
)


class FetchWeatherDataAPIView(APIView):
    def post(self, request):
        serializer = FetchWeatherDataSerializer(data=request.data)
        if serializer.is_valid():
            region = serializer.validated_data['region']
            parameter = serializer.validated_data['parameter']
            year = serializer.validated_data['year']

            # Send request to the external API and save the data
            get_weather_data(region, parameter, year)

            return Response({"message": "Data fetched and saved successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllDataListView(APIView):
    def get(self, request):
        # Fetch all MonthlyData
        monthly_data = MonthlyData.objects.all()
        monthly_serializer = MonthlyDataSerializer(monthly_data, many=True)

        # Fetch all SeasonalData
        seasonal_data = SeasonalData.objects.all()
        seasonal_serializer = SeasonalDataSerializer(seasonal_data, many=True)

        # Fetch all AnnualData
        annual_data = AnnualData.objects.all()
        annual_serializer = AnnualDataSerializer(annual_data, many=True)

        # Combine all data into a single response
        return Response({
            "monthly_data": monthly_serializer.data,
            "seasonal_data": seasonal_serializer.data,
            "annual_data": annual_serializer.data,
        })


