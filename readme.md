1. Setup your postgresql database and create a .env file and add following:
USER = <Postgres_Username>
DATABASE_NAME = <Database_Name>
DATABASE_PASS = <Database_Password>

2. Run pip install -r requirements.txt

3. Run python manage.py makemigrations

4. Run python manage.py migrate

5. cd frontend

6. npm install 

7. npm run build

8. cd ..

9. python manage.py runserver

10. Navigate to http://127.0.0.1:8000/insertpd to insert predictor data

11. Navigate to http://127.0.0.1:8000/insert to insert doctor data

12. Navigate to http://127.0.0.1:8000