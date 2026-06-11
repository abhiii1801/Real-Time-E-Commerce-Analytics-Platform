from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, to_timestamp
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    IntegerType,
    DoubleType
)

spark = (
    SparkSession.builder
    .appName("OrdersToPostgres")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

order_schema = StructType([

    StructField("order_id", StringType(), True),

    StructField("customer_id", StringType(), True),
    StructField("customer_name", StringType(), True),
    StructField("customer_age", IntegerType(), True),
    StructField("age_group", StringType(), True),
    StructField("gender", StringType(), True),
    StructField("customer_city", StringType(), True),
    StructField("customer_state", StringType(), True),
    StructField("customer_region", StringType(), True),
    StructField("customer_tier", StringType(), True),

    StructField("product_id", StringType(), True),
    StructField("product_name", StringType(), True),
    StructField("category", StringType(), True),
    StructField("subcategory", StringType(), True),
    StructField("brand", StringType(), True),

    StructField("quantity", IntegerType(), True),

    StructField("price_inr", DoubleType(), True),

    StructField("discount_percent", IntegerType(), True),
    StructField("discount_amount", DoubleType(), True),

    StructField("total_amount", DoubleType(), True),

    StructField("cost_amount", DoubleType(), True),
    StructField("profit_amount", DoubleType(), True),

    StructField("payment_method", StringType(), True),
    StructField("order_status", StringType(), True),

    StructField("delivery_days", IntegerType(), True),

    StructField("order_timestamp", StringType(), True)
])

raw_df = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:29092")
    .option("subscribe", "orders")
    .option("startingOffsets", "latest")
    .load()
)

parsed_df = (
    raw_df
    .selectExpr("CAST(value AS STRING) AS json_data")
    .select(
        from_json(
            col("json_data"),
            order_schema
        ).alias("data")
    )
    .select("data.*")
)

orders_df = (
    parsed_df
    .withColumn(
        "order_timestamp",
        to_timestamp("order_timestamp")
    )
)

POSTGRES_URL = (
    "jdbc:postgresql://postgres:5432/ecommerce"
)

POSTGRES_PROPERTIES = {
    "user": "admin",
    "password": "admin",
    "driver": "org.postgresql.Driver"
}


def write_to_postgres(batch_df, batch_id):

    print(f"Writing batch {batch_id}")

    (
        batch_df.write
        .mode("append")
        .jdbc(
            url=POSTGRES_URL,
            table="orders",
            properties=POSTGRES_PROPERTIES
        )
    )


query = (
    orders_df.writeStream
    .foreachBatch(write_to_postgres)
    .outputMode("append")
    .start()
)

query.awaitTermination()