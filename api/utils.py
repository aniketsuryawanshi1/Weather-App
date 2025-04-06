import requests
from .models import MonthlyData, SeasonalData, AnnualData, Metadata

BASE_URL = "https://www.metoffice.gov.uk/pub/data/weather/uk/climate/datasets/{parameter}/date/{region}.txt"

def get_weather_data(region, parameter, year):
    url = BASE_URL.format(region=region, parameter=parameter)
    response = requests.get(url)

    if response.status_code == 200:
        return extract_data(response.text, region, parameter, year)
    else:
        print(f"Failed to fetch data for {region} and {parameter}. Status code: {response.status_code}")
        return None

def extract_data(text, region, parameter, target_year):
    lines = text.strip().split('\n')
    # Extract metadata from the first few lines
    metadata = []
    data_start_index = 0
    for i, line in enumerate(lines):
        if line.strip().startswith("year"):
            data_start_index = i
            break
        metadata.append(line.strip())

    # Save metadata to the database using update_or_create
    Metadata.objects.update_or_create(
        defaults={"content": "\n".join(metadata)}  # Join metadata lines into a single string
    )

    print("\n" + "=" * 80)
    print(f"📍 Weather Data Summary for Region: {region} | Parameter: {parameter}\n")
    
    # Print metadata
    print("🔹 Metadata:")
    for meta in metadata:
        print(f"   - {meta}")
        
    data_start_index = next((i for i, line in enumerate(lines) if line.strip().lower().startswith("year")), None)
    if data_start_index is None:
        print("Invalid format. Header row starting with 'year' not found.")
        return

    headers = lines[data_start_index].split()
    data_lines = lines[data_start_index + 1:]

    for line in data_lines:
        values = line.split()
        if len(values) != len(headers):
            continue

        year_data = dict(zip(headers, values))

        if year_data['year'] != str(target_year):
            continue  # Skip years not matching the user-specified year

        # Save monthly data
        for month in headers[1:13]:
            MonthlyData.objects.update_or_create(
                region=region,
                parameter=parameter,
                year=year_data['year'],
                month=month[:3].capitalize(),  # Ensure month is in the correct format (e.g., "Jan", "Feb")
                defaults={'value': float(year_data[month]) if year_data[month] != "---" else None}
            )

        # Save seasonal data
        for season in headers[13:17]:
            SeasonalData.objects.update_or_create(
                region=region,
                parameter=parameter,
                year=year_data['year'],
                season=season.capitalize(),  # Ensure season is in the correct format (e.g., "Winter", "Spring")
                defaults={'value': float(year_data[season]) if year_data[season] != "---" else None}
            )

        # Save annual data
        if 'ann' in year_data:
            AnnualData.objects.update_or_create(
                region=region,
                parameter=parameter,
                year=year_data['year'],
                defaults={'annual_value': float(year_data['ann']) if year_data['ann'] != "---" else None}
            )

    print(f"Data for {region} and {parameter} in {target_year} saved successfully.")





