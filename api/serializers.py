from rest_framework import serializers
from .models import MonthlyData, SeasonalData, AnnualData

class FetchWeatherDataSerializer(serializers.Serializer):
    region = serializers.CharField(max_length=50)
    parameter = serializers.CharField(max_length=30)
    year = serializers.IntegerField()

    def validate(self, data):
        if not data.get('region') or not data.get('parameter') or not data.get('year'):
            raise serializers.ValidationError("Region, parameter, and year are required.")
        return data
    
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