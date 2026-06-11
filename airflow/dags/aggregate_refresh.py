from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator


default_args = {
    "owner": "airflow",
    "start_date": datetime(2026, 6, 1)
}

with DAG(
    dag_id="refresh_analytics_tables",
    default_args=default_args,
    schedule="*/1 * * * *",
    catchup=False,
    is_paused_upon_creation=False
) as dag:

    refresh_tables = BashOperator(
        task_id="build_aggregates",
        bash_command="""
        python /opt/airflow/jobs/refresh_analytics.py
        """
    )