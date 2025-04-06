from rest_framework import serializers
from .models import MonthlyData, SeasonalData, AnnualData

class FetchWeatherDataSerializer(serializers.Serializer):
    region = serializers.CharField(max_length=50)
    parameter = serializers.CharField(max_length=30)
    year = serializers.IntegerField()
    
class MonthlyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyData
        fields = ['id', 'region', 'parameter', 'year', 'month', 'value']


class SeasonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeasonalData
        fields = ['id', 'region', 'parameter', 'year', 'season', 'value']


class AnnualDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnualData
        fields = ['id', 'region', 'parameter', 'year', 'annual_value']