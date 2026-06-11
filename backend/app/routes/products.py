from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/top-products")
def top_products():

    query = """
    SELECT *
    FROM top_products
    ORDER BY total_revenue DESC
    LIMIT 20
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/top-customers")
def top_customers():

    query = """
    SELECT *
    FROM top_customers
    ORDER BY total_spent DESC
    LIMIT 20
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-payment-method")
def payment_method():

    query = """
    SELECT *
    FROM sales_by_payment_method
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-order-status")
def order_status():

    query = """
    SELECT *
    FROM sales_by_order_status
    ORDER BY total_orders DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-age-group")
def age_group():

    query = """
    SELECT *
    FROM sales_by_age_group
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-gender")
def gender():

    query = """
    SELECT *
    FROM sales_by_gender
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]


@router.get("/sales-by-customer-tier")
def customer_tier():

    query = """
    SELECT *
    FROM sales_by_customer_tier
    ORDER BY total_revenue DESC
    """

    with engine.connect() as conn:

        rows = conn.execute(text(query))

        return [
            dict(row._mapping)
            for row in rows
        ]