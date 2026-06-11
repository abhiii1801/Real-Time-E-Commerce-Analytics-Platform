from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.category import router as category_router
from app.routes.city import router as city_router
from app.routes.products import router as products_router
from app.routes.dashboard import router as dashboard_router
from app.routes.monitoring import router as monitoring_router

app = FastAPI(
    title="E-Commerce Analytics API"
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Routes
# ==========================================

app.include_router(category_router)
app.include_router(city_router)
app.include_router(products_router)
app.include_router(dashboard_router)
app.include_router(monitoring_router)


@app.get("/")
def home():

    return {
        "message": "API Running"
    }