from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/sales-by-category")
def sales_by_category():

    query = """
    SELECT *
    FROM sales_by_category
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-brand")
def sales_by_brand():

    query = """
    SELECT *
    FROM sales_by_brand
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]