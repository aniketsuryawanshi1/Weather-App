# Weather App

This Weather App is a full-stack application built with Django (REST API) and React (Vite.js) to fetch, store, and serve summarized weather data from the UK MetOffice. The app allows users to query specific climate parameters and fetch only the required fields from the database, optimizing performance.

# Weather Data Parser – FarmSetu Assignment

This project is a Django + React.js based application that parses summarized weather data from the UK MetOffice, stores it in a MySQL database, and serves it via RESTful APIs.

## 🔧 Tech Stack

- Backend: Django REST Framework
- Frontend: React.js
- Database: MySQL
- Docker Support
- API Integration

---

## ⚙️ Prerequisites

- Python 3.8+
- Node.js & npm
- MySQL
- Git
- Docker (optional)

---

## 🛠️ Backend Setup (Django)

```bash
# 1. Clone the repository
git clone https://github.com/aniketsuryawanshi1/Weather-App.git
cd Weather-App

# 2. Create a virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure your MySQL database in `settings.py`

# 5. Run migrations
python manage.py makemigrations
python manage.py migrate

# 6. Run the server
python manage.py runserver
```

## 🐳 Docker Commands

```bash
docker exec WeatherApp pip install -r requirements.txt
docker exec WeatherApp python manage.py makemigrations
docker exec WeatherApp python manage.py migrate
docker exec WeatherApp python manage.py collectstatic --noinput
docker exec -it WeatherApp python manage.py createsuperuser
docker-compose exec web python manage.py test
```
