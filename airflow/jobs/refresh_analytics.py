import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

DATABASE_URL = (
    "postgresql://admin:admin@postgres:5432/ecommerce"
)

engine = create_engine(DATABASE_URL)

orders = pd.read_sql(
    "SELECT * FROM orders",
    engine
)

products = pd.read_sql(
    "SELECT * FROM products",
    engine
)

current_time = datetime.utcnow()

# ==================================================
# DASHBOARD SUMMARY
# ==================================================

dashboard_summary = pd.DataFrame([{
    "total_orders": len(orders),
    "total_revenue": round(
        orders["total_amount"].sum(),
        2
    ),
    "total_profit": round(
        orders["profit_amount"].sum(),
        2
    ),
    "average_order_value": round(
        orders["total_amount"].mean(),
        2
    ),
    "unique_customers": orders[
        "customer_id"
    ].nunique(),
    "updated_at": current_time
}])

# ==================================================
# SALES BY CATEGORY
# ==================================================

sales_by_category = (
    orders
    .groupby("category")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum"),
        total_quantity=("quantity", "sum")
    )
    .reset_index()
)

sales_by_category["updated_at"] = current_time

# ==================================================
# SALES BY CITY
# ==================================================

sales_by_city = (
    orders
    .groupby("customer_city")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)

sales_by_city["updated_at"] = current_time

# ==================================================
# SALES BY REGION
# ==================================================

sales_by_region = (
    orders
    .groupby("customer_region")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)

sales_by_region["updated_at"] = current_time

# ==================================================
# SALES BY BRAND
# ==================================================

sales_by_brand = (
    orders
    .groupby("brand")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)

sales_by_brand["updated_at"] = current_time

# ==================================================
# SALES BY AGE GROUP
# ==================================================

sales_by_age_group = (
    orders
    .groupby("age_group")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum")
    )
    .reset_index()
)

sales_by_age_group["updated_at"] = current_time

# ==================================================
# CUSTOMER TIER
# ==================================================

sales_by_customer_tier = (
    orders
    .groupby("customer_tier")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum")
    )
    .reset_index()
)

sales_by_customer_tier["updated_at"] = current_time

# ==================================================
# PAYMENT METHOD
# ==================================================

sales_by_payment_method = (
    orders
    .groupby("payment_method")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum")
    )
    .reset_index()
)

sales_by_payment_method["updated_at"] = current_time

# ==================================================
# ORDER STATUS
# ==================================================

sales_by_order_status = (
    orders
    .groupby("order_status")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum")
    )
    .reset_index()
)

sales_by_order_status["updated_at"] = current_time

# ==================================================
# TOP PRODUCTS
# ==================================================

top_products = (
    orders
    .groupby(
        [
            "product_id",
            "product_name",
            "brand"
        ]
    )
    .agg(
        total_quantity=("quantity", "sum"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum"),
        total_orders=("order_id", "count")
    )
    .reset_index()
)

top_products["updated_at"] = current_time

# ==================================================
# SALES TREND
# ==================================================

orders["minute_bucket"] = (
    pd.to_datetime(
        orders["order_timestamp"]
    ).dt.floor("min")
)

sales_trend = (
    orders
    .groupby("minute_bucket")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)

# ==================================================
# INVENTORY SUMMARY
# ==================================================

inventory_summary = pd.DataFrame([{
    "total_products": len(products),
    "out_of_stock_products":
        len(products[
            products["stock_quantity"] == 0
        ]),
    "low_stock_products":
        len(products[
            products["stock_quantity"] < 20
        ]),
    "inventory_value":
        round(
            (
                products["stock_quantity"]
                * products["cost_price_inr"]
            ).sum(),
            2
        ),
    "updated_at": current_time
}])

sales_by_gender = (
    orders
    .groupby("gender")
    .agg(
        total_orders=("order_id", "count"),
        total_revenue=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)

sales_by_gender["updated_at"] = current_time

profit_summary = pd.DataFrame([{
    "total_profit":
        round(
            orders["profit_amount"].sum(),
            2
        ),

    "average_profit_per_order":
        round(
            orders["profit_amount"].mean(),
            2
        ),

    "profit_margin_percent":
        round(
            (
                orders["profit_amount"].sum()
                /
                orders["total_amount"].sum()
            ) * 100,
            2
        ),

    "updated_at": current_time
}])



top_customers = (
    orders
    .groupby(
        [
            "customer_id",
            "customer_name",
            "customer_tier"
        ]
    )
    .agg(
        total_orders=("order_id", "count"),
        total_spent=("total_amount", "sum"),
        total_profit=("profit_amount", "sum")
    )
    .reset_index()
)


# ==================================================
# WRITE TABLES
# ==================================================

tables = {
    "dashboard_summary": dashboard_summary,
    "sales_by_category": sales_by_category,
    "sales_by_city": sales_by_city,
    "sales_by_region": sales_by_region,
    "sales_by_brand": sales_by_brand,
    "sales_by_age_group": sales_by_age_group,
    "sales_by_customer_tier": sales_by_customer_tier,
    "sales_by_payment_method": sales_by_payment_method,
    "sales_by_order_status": sales_by_order_status,
    "top_products": top_products,
    "sales_trend": sales_trend,
    "inventory_summary": inventory_summary,
    "sales_by_gender": sales_by_gender,
    "profit_summary": profit_summary,
    "top_customers": top_customers
}

for table_name, df in tables.items():

    df.to_sql(
        table_name,
        engine,
        if_exists="replace",
        index=False
    )

print("Analytics refresh completed.")