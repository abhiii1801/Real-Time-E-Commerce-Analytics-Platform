from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/dashboard-summary")
def dashboard_summary():

    query = """
    SELECT *
    FROM dashboard_summary
    LIMIT 1
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return dict(row._mapping)


@router.get("/profit-summary")
def profit_summary():

    query = """
    SELECT *
    FROM profit_summary
    LIMIT 1
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return dict(row._mapping)


@router.get("/inventory-summary")
def inventory_summary():

    query = """
    SELECT *
    FROM inventory_summary
    LIMIT 1
    """

    with engine.connect() as conn:

        row = conn.execute(
            text(query)
        ).fetchone()

        return dict(row._mapping)


@router.get("/sales-trend")
def sales_trend():

    query = """
    SELECT *
    FROM sales_trend
    ORDER BY minute_bucket
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]