import pandas as pd
from sqlalchemy import create_engine, text

engine = create_engine(
    "postgresql+psycopg2://admin:admin@localhost:5432/ecommerce"
)

# ==========================================
# DROP OLD TABLES
# ==========================================

with engine.begin() as conn:

    conn.execute(text("DROP TABLE IF EXISTS orders CASCADE"))
    conn.execute(text("DROP TABLE IF EXISTS customers CASCADE"))
    conn.execute(text("DROP TABLE IF EXISTS products CASCADE"))

# ==========================================
# LOAD CUSTOMERS
# ==========================================

customers = pd.read_csv(
    "seed-data/users_data.csv"
)

customers.to_sql(
    "customers",
    engine,
    if_exists="replace",
    index=False
)

print("Customers loaded")

# ==========================================
# LOAD PRODUCTS
# ==========================================

products = pd.read_csv(
    "seed-data/products_data.csv"
)

products.to_sql(
    "products",
    engine,
    if_exists="replace",
    index=False
)

print("Products loaded")

print("Seed loading completed")