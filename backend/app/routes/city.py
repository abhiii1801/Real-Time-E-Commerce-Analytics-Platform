from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/sales-by-city")
def sales_by_city():

    query = """
    SELECT *
    FROM sales_by_city
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-region")
def sales_by_region():

    query = """
    SELECT *
    FROM sales_by_region
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]