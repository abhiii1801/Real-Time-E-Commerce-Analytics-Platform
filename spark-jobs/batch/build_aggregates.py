from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    count,
    sum,
    current_timestamp,
    col
)

# ==================================================
# Spark Session
# ==================================================

spark = (
    SparkSession.builder
    .appName("BuildAggregates")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

# ==================================================
# PostgreSQL Config
# ==================================================

POSTGRES_URL = "jdbc:postgresql://postgres:5432/ecommerce"

POSTGRES_PROPERTIES = {
    "user": "admin",
    "password": "admin",
    "driver": "org.postgresql.Driver"
}

# ==================================================
# Load Orders
# ==================================================

orders_df = (
    spark.read
    .jdbc(
        url=POSTGRES_URL,
        table="orders",
        properties=POSTGRES_PROPERTIES
    )
)

print("\nOrders Loaded:", orders_df.count())

# ==================================================
# Sales By Category
# ==================================================

sales_by_category = (
    orders_df
    .groupBy("category")
    .agg(
        count("*").alias("total_orders"),
        sum("total_amount").alias("total_revenue"),
        sum("quantity").alias("total_quantity")
    )
    .withColumn("updated_at", current_timestamp())
)

# ==================================================
# Sales By City
# ==================================================

sales_by_city = (
    orders_df
    .groupBy("customer_city")
    .agg(
        count("*").alias("total_orders"),
        sum("total_amount").alias("total_revenue"),
        sum("quantity").alias("total_quantity")
    )
    .withColumn("updated_at", current_timestamp())
)

# ==================================================
# Top Products
# ==================================================

top_products = (
    orders_df
    .groupBy(
        "product_id",
        "product_name"
    )
    .agg(
        sum("quantity").alias("total_quantity"),
        sum("total_amount").alias("total_revenue"),
        count("*").alias("total_orders")
    )
    .withColumn("updated_at", current_timestamp())
)

# ==================================================
# Overwrite Analytics Tables
# ==================================================

(
    sales_by_category.write
    .mode("overwrite")
    .jdbc(
        url=POSTGRES_URL,
        table="sales_by_category",
        properties=POSTGRES_PROPERTIES
    )
)

(
    sales_by_city.write
    .mode("overwrite")
    .jdbc(
        url=POSTGRES_URL,
        table="sales_by_city",
        properties=POSTGRES_PROPERTIES
    )
)

(
    top_products.write
    .mode("overwrite")
    .jdbc(
        url=POSTGRES_URL,
        table="top_products",
        properties=POSTGRES_PROPERTIES
    )
)

print("\nAnalytics Tables Updated Successfully")