from django.urls import path
from .views import FetchWeatherDataAPIView, AllDataListView

urlpatterns = [
    path('fetch-weather-data/', FetchWeatherDataAPIView.as_view(), name='fetch-weather-data'),
    path('all-data/', AllDataListView.as_view(), name='all-data'),

]
