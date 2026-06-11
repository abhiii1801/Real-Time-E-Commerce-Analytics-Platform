import pandas as pd
import random
from faker import Faker
from datetime import date

fake = Faker("en_IN")

NUM_USERS = 1000
NUM_PRODUCTS = 500

CITY_STATE_REGION = {
    "Mumbai": ("Maharashtra", "West"),
    "Pune": ("Maharashtra", "West"),
    "Ahmedabad": ("Gujarat", "West"),
    "Surat": ("Gujarat", "West"),

    "Delhi": ("Delhi", "North"),
    "Chandigarh": ("Punjab", "North"),
    "Lucknow": ("Uttar Pradesh", "North"),
    "Jaipur": ("Rajasthan", "North"),

    "Bengaluru": ("Karnataka", "South"),
    "Hyderabad": ("Telangana", "South"),
    "Chennai": ("Tamil Nadu", "South"),

    "Kolkata": ("West Bengal", "East")
}

PRODUCT_CATALOG = {
    "Electronics": {
        "Mobile": ["Samsung", "Apple", "Xiaomi", "OnePlus"],
        "Laptop": ["Dell", "HP", "Lenovo", "Asus"],
        "Headphones": ["Sony", "Boat", "JBL"]
    },

    "Apparel & Accessories": {
        "Shirts": ["Levis", "Allen Solly", "US Polo"],
        "Shoes": ["Nike", "Adidas", "Puma"]
    },

    "Home & Kitchen": {
        "Furniture": ["Ikea", "HomeTown"],
        "Appliances": ["LG", "Samsung"]
    },

    "Books & Stationery": {
        "Books": ["Penguin", "HarperCollins"],
        "Stationery": ["Classmate", "Camlin"]
    },

    "Sports & Outdoors": {
        "Fitness": ["Decathlon"],
        "Cricket": ["SG", "MRF"]
    },

    "Beauty & Personal Care": {
        "Skincare": ["Nivea", "Lakme"],
        "Haircare": ["Dove", "Loreal"]
    },

    "Toys & Games": {
        "Toys": ["Funskool"],
        "Board Games": ["Hasbro"]
    },

    "Automotive": {
        "Accessories": ["Bosch"],
        "Tools": ["Stanley"]
    },

    "Groceries & Gourmet": {
        "Snacks": ["Haldiram"],
        "Beverages": ["Tata Tea"]
    },

    "Health & Wellness": {
        "Supplements": ["MuscleBlaze"],
        "Healthcare": ["Himalaya"]
    }
}


def get_age_group(age):
    if age <= 25:
        return "18-25"
    elif age <= 35:
        return "26-35"
    elif age <= 50:
        return "36-50"
    return "50+"


def get_customer_tier(registration_date):
    days = (date.today() - registration_date).days

    if days < 180:
        return "Bronze"
    elif days < 365:
        return "Silver"
    elif days < 730:
        return "Gold"
    return "Platinum"


def generate_users(num_users):

    users = []

    cities = list(CITY_STATE_REGION.keys())

    for i in range(1, num_users + 1):

        age = random.randint(18, 75)

        city = random.choice(cities)

        state, region = CITY_STATE_REGION[city]

        registration_date = fake.date_between(
            start_date="-3y",
            end_date="today"
        )

        users.append({
            "user_id": f"USR_{i:04d}",
            "full_name": fake.name(),
            "age": age,
            "age_group": get_age_group(age),
            "gender": random.choice(["Male", "Female"]),
            "city": city,
            "state": state,
            "region": region,
            "phone_number": fake.phone_number(),
            "email": fake.ascii_email(),
            "registration_date": registration_date,
            "customer_tier": get_customer_tier(registration_date)
        })

    return pd.DataFrame(users)


def generate_products(num_products):

    products = []

    categories = list(PRODUCT_CATALOG.keys())

    for i in range(1, num_products + 1):

        category = random.choice(categories)

        subcategory = random.choice(
            list(PRODUCT_CATALOG[category].keys())
        )

        brand = random.choice(
            PRODUCT_CATALOG[category][subcategory]
        )

        price = round(random.uniform(99, 75000), 2)

        cost_price = round(
            price * random.uniform(0.55, 0.85),
            2
        )

        products.append({
            "product_id": f"PRD_{i:04d}",
            "product_name": fake.catch_phrase().title(),
            "category": category,
            "subcategory": subcategory,
            "brand": brand,
            "description": fake.sentence(nb_words=12),
            "price_inr": price,
            "cost_price_inr": cost_price,
            "stock_quantity": random.randint(0, 1000),
            "average_rating": round(random.uniform(1, 5), 1),
            "total_reviews": random.randint(0, 5000),
            "supplier": fake.company(),
            "launch_date": fake.date_between(
                start_date="-5y",
                end_date="today"
            )
        })

    return pd.DataFrame(products)


if __name__ == "__main__":

    users = generate_users(NUM_USERS)

    products = generate_products(NUM_PRODUCTS)

    users.to_csv(
        "users_data.csv",
        index=False
    )

    products.to_csv(
        "products_data.csv",
        index=False
    )

    print("Users generated:", len(users))
    print("Products generated:", len(products))