from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import MonthlyData, SeasonalData, AnnualData, Metadata
from .utils import extract_data


class FetchWeatherDataAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.fetch_url = "/api/fetch-weather-data/"
        self.all_data_url = "/api/all-data/"
        self.valid_payload = {
            "region": "england",
            "parameter": "Tmax",
            "year": 2023
        }
        self.invalid_payload = {
            "region": "",
            "parameter": "",
            "year": ""
        }

    def test_fetch_weather_data_post_valid(self):
        response = self.client.post(self.fetch_url, self.valid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)

    def test_fetch_weather_data_post_invalid(self):
        response = self.client.post(self.fetch_url, self.invalid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_fetch_weather_data_get_choices(self):
        response = self.client.get(self.fetch_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("region_choices", response.data)
        self.assertIn("parameter_choices", response.data)
        self.assertIn("year_choices", response.data)

    def test_all_data_list_view(self):
        response = self.client.get(self.all_data_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("metadata", response.data)
        self.assertIn("monthly_data", response.data)
        self.assertIn("seasonal_data", response.data)
        self.assertIn("annual_data", response.data)


class UtilsTest(TestCase):
    def setUp(self):
        # Sample text mimicking raw weather data
        self.sample_text = """
        Metadata line 1
        Metadata line 2
        year Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Win Spr Sum Aut ann
        2023 5.1 6.2 7.3 8.4 9.5 10.6 11.7 12.8 13.9 14.0 15.1 16.2 5.5 7.8 10.0 12.3 10.5
        """
        self.region = "england"
        self.parameter = "Tmax"
        self.year = 2023

    def test_extract_data(self):
        extract_data(self.sample_text, self.region, self.parameter, self.year)

        # Metadata check
        metadata = Metadata.objects.first()
        self.assertIsNotNone(metadata)
        self.assertIn("Metadata line 1", metadata.content)

        # Monthly data
        monthly_data = MonthlyData.objects.filter(region=self.region, parameter=self.parameter, year=self.year)
        self.assertEqual(monthly_data.count(), 12)

        # Seasonal data
        seasonal_data = SeasonalData.objects.filter(region=self.region, parameter=self.parameter, year=self.year)
        self.assertEqual(seasonal_data.count(), 4)

        # Annual data
        annual_data = AnnualData.objects.filter(region=self.region, parameter=self.parameter, year=self.year)
        self.assertEqual(annual_data.count(), 1)
