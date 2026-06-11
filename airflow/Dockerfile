FROM apache/airflow:2.10.0

COPY requirements.txt /requirements.txt

RUN pip install --no-cache-dir -r /requirements.txt

ENV AIRFLOW__WEBSERVER__SECRET_KEY=mysecretkey
ENV AIRFLOW__CORE__LOAD_EXAMPLES=False