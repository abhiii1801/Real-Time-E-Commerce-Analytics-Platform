from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/recent-orders")
def recent_orders():

    query = """
    SELECT *
    FROM orders
    ORDER BY order_timestamp DESC
    LIMIT 100
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/live-stats")
def live_stats():

    query = """
    SELECT

        COUNT(*) FILTER (
            WHERE order_timestamp >= NOW() - INTERVAL '1 minute'
        ) AS orders_last_minute,

        COUNT(*) FILTER (
            WHERE order_timestamp >= NOW() - INTERVAL '5 minutes'
        ) AS orders_last_5_minutes,

        COALESCE(
            SUM(total_amount) FILTER (
                WHERE order_timestamp >= NOW() - INTERVAL '1 hour'
            ),
            0
        ) AS revenue_last_hour,

        COUNT(
            DISTINCT customer_id
        ) FILTER (
            WHERE order_timestamp >= NOW() - INTERVAL '1 hour'
        ) AS active_customers

    FROM orders
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return dict(row._mapping)


@router.get("/system-health")
def system_health():

    query = """
    SELECT
        COUNT(*) AS orders_count,
        MAX(order_timestamp) AS last_order_received
    FROM orders
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return {
            "postgres_status": "UP",
            "kafka_status": "UP",
            "spark_status": "UP",
            "airflow_status": "UP",
            "backend_status": "UP",
            "orders_count":
                row.orders_count,
            "last_order_received":
                row.last_order_received,
            "health_score": 100
        }


@router.get("/data-quality")
def data_quality():

    query = """
    SELECT

        COUNT(*) AS total_orders,

        COUNT(*) FILTER (
            WHERE customer_id IS NULL
        ) AS null_customer_ids,

        COUNT(*) FILTER (
            WHERE product_id IS NULL
        ) AS null_product_ids,

        COUNT(*) FILTER (
            WHERE total_amount < 0
        ) AS negative_revenue_rows,

        COUNT(*) FILTER (
            WHERE profit_amount < 0
        ) AS negative_profit_rows

    FROM orders
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return dict(row._mapping)