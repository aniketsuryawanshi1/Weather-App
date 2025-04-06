from django.db import models

# --- REGION CHOICES ---
REGION_CHOICES = [
    ('UK', 'UK'),
    ('England', 'England'),
    ('Wales', 'Wales'),
    ('Scotland', 'Scotland'),
    ('Northern_Ireland', 'Northern Ireland'),
    ('England_and_Wales', 'England and Wales'),
    ('England_N', 'England North'),
    ('England_S', 'England South'),
    ('Scotland_N', 'Scotland North'),
    ('Scotland_E', 'Scotland East'),
    ('Scotland_W', 'Scotland West'),
    ('England_E_and_NE', 'England East & NE'),
    ('England_NW_and_Wales_N', 'England NW & Wales N'),
    ('Midlands', 'Midlands'),
    ('East_Anglia', 'East Anglia'),
    ('England_SW_and_Wales_S', 'England SW & Wales S'),
    ('England_SE_and_Central_S', 'England SE & Central S'),
]

# --- PARAMETER CHOICES ---
PARAMETER_CHOICES = [
    ('Tmax', 'Max Temperature'),
    ('Tmin', 'Min Temperature'),
    ('Tmean', 'Mean Temperature'),
    ('Sunshine', 'Sunshine'),
    ('Rainfall', 'Rainfall'),
    ('Raindays1mm', 'Rain days ≥1.0mm'),
    ('AirFrost', 'Days of Air Frost'),
]

# --- YEAR CHOICES (as string pairs for CharField) ---
YEAR_CHOICES = [(str(y), str(y)) for y in range(1884, 2026)]


class MonthlyData(models.Model):
    region = models.CharField(max_length=50, choices=REGION_CHOICES)
    parameter = models.CharField(max_length=30, choices=PARAMETER_CHOICES)
    year = models.CharField(max_length=4, choices=YEAR_CHOICES)
    month = models.CharField(max_length=3)
    value = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('region', 'parameter', 'year', 'month')
        ordering = ['year', 'month']  # Default ordering by year and month

    def __str__(self):
        return f"{self.region} - {self.parameter} | {self.month} {self.year}"


class SeasonalData(models.Model):
    region = models.CharField(max_length=50, choices=REGION_CHOICES)
    parameter = models.CharField(max_length=30, choices=PARAMETER_CHOICES)
    year = models.CharField(max_length=4, choices=YEAR_CHOICES)
    season = models.CharField(max_length=10)
    value = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('region', 'parameter', 'year', 'season')
        ordering = ['year', 'season']  # Default ordering by year and season

    def __str__(self):
        return f"{self.region} - {self.parameter} | {self.season} {self.year}"


class AnnualData(models.Model):
    region = models.CharField(max_length=50, choices=REGION_CHOICES)
    parameter = models.CharField(max_length=30, choices=PARAMETER_CHOICES)
    year = models.CharField(max_length=4, choices=YEAR_CHOICES)
    annual_value = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('region', 'parameter', 'year')
        ordering = ['year']  # Default ordering by year

    def __str__(self):
        return f"{self.region} - {self.parameter} | Annual {self.year}"
