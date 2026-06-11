import json
import random
import time
from datetime import datetime

import pandas as pd
from kafka import KafkaProducer
from sqlalchemy import create_engine

from datetime import datetime
from zoneinfo import ZoneInfo



from config import (
    POSTGRES_CONFIG,
    KAFKA_BOOTSTRAP_SERVERS,
    ORDER_TOPIC
)

print("Connecting to PostgreSQL...")

DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"{POSTGRES_CONFIG['user']}:"
    f"{POSTGRES_CONFIG['password']}@"
    f"{POSTGRES_CONFIG['host']}:"
    f"{POSTGRES_CONFIG['port']}/"
    f"{POSTGRES_CONFIG['database']}"
)

engine = create_engine(DATABASE_URL)

print("Loading customers...")
customers_df = pd.read_sql(
    """
    SELECT
        user_id,
        full_name,
        age,
        age_group,
        gender,
        city,
        state,
        region,
        customer_tier
    FROM customers
    """,
    engine
)

print("Loading products...")
products_df = pd.read_sql(
    """
    SELECT
        product_id,
        product_name,
        category,
        subcategory,
        brand,
        price_inr,
        cost_price_inr
    FROM products
    """,
    engine
)

PAYMENT_METHODS = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Cash On Delivery"
]

ORDER_STATUSES = [
    "PLACED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
]

print(f"Loaded {len(customers_df)} customers")
print(f"Loaded {len(products_df)} products")

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda x: json.dumps(x).encode("utf-8")
)

print("Kafka Producer Connected")

order_counter = 1

while True:

    customer = customers_df.sample(1).iloc[0]

    product = products_df.sample(1).iloc[0]

    quantity = random.randint(1, 4)

    discount_percent = random.choice(
        [0, 5, 10, 15, 20]
    )

    discount_amount = round(
        quantity
        * float(product["price_inr"])
        * discount_percent
        / 100,
        2
    )

    gross_amount = (
        quantity
        * float(product["price_inr"])
    )

    final_amount = round(
        gross_amount - discount_amount,
        2
    )

    cost_amount = round(
        quantity
        * float(product["cost_price_inr"]),
        2
    )

    profit_amount = round(
        final_amount - cost_amount,
        2
    )

    event = {
        "order_id": f"ORD_{order_counter:06}",

        "customer_id": customer["user_id"],
        "customer_name": customer["full_name"],
        "customer_age": int(customer["age"]),
        "age_group": customer["age_group"],
        "gender": customer["gender"],
        "customer_city": customer["city"],
        "customer_state": customer["state"],
        "customer_region": customer["region"],
        "customer_tier": customer["customer_tier"],

        "product_id": product["product_id"],
        "product_name": product["product_name"],
        "category": product["category"],
        "subcategory": product["subcategory"],
        "brand": product["brand"],

        "quantity": quantity,

        "price_inr": float(product["price_inr"]),

        "discount_percent": discount_percent,
        "discount_amount": discount_amount,

        "total_amount": final_amount,

        "cost_amount": cost_amount,

        "profit_amount": profit_amount,

        "payment_method": random.choice(
            PAYMENT_METHODS
        ),

        "order_status": random.choices(
            ORDER_STATUSES,
            weights=[5, 10, 82, 3]
        )[0],

        "delivery_days": random.randint(1, 7),

        "order_timestamp": datetime.now(
            ZoneInfo("Asia/Kolkata")
        ).isoformat(),
    }

    producer.send(
        ORDER_TOPIC,
        value=event
    )

    print(event)

    order_counter += 1

    time.sleep(1)