from django.contrib import admin
from .models import MonthlyData, SeasonalData, AnnualData

@admin.register(MonthlyData)
class MonthlyDataAdmin(admin.ModelAdmin):
    list_display = ('region', 'parameter', 'year', 'month', 'value')
    list_filter = ('region', 'parameter', 'year', 'month')
    search_fields = ('region', 'parameter', 'year', 'month')

@admin.register(SeasonalData)
class SeasonalDataAdmin(admin.ModelAdmin):
    list_display = ('region', 'parameter', 'year', 'season', 'value')
    list_filter = ('region', 'parameter', 'year', 'season')
    search_fields = ('region', 'parameter', 'year', 'season')

@admin.register(AnnualData)
class AnnualDataAdmin(admin.ModelAdmin):
    list_display = ('region', 'parameter', 'year', 'annual_value')
    list_filter = ('region', 'parameter', 'year')
    search_fields = ('region', 'parameter', 'year')