# Real-Time E-Commerce Analytics Platform

A real-time analytics platform built using Kafka, Apache Spark Streaming, PostgreSQL, Airflow, FastAPI, React, and Docker.

The system simulates live e-commerce transactions, processes them through a streaming pipeline, generates analytical insights, and visualizes them through interactive dashboards.

## Architecture

```text
Order Generator
      ↓
    Kafka
      ↓
Spark Streaming
      ↓
 PostgreSQL
      ↓
   Airflow
      ↓
Analytics Tables
      ↓
   FastAPI
      ↓
 React Dashboard
```

## Tech Stack

### Data Engineering

* Apache Kafka
* Apache Spark Structured Streaming
* Apache Airflow
* PostgreSQL

### Backend

* FastAPI
* SQLAlchemy
* Pandas

### Frontend

* React
* Recharts
* Axios
* React Router

### Infrastructure

* Docker
* Docker Compose

## Features

### Analytics Dashboard

<img width="1917" height="1043" alt="Screenshot From 2026-06-11 15-50-45" src="https://github.com/user-attachments/assets/2af85cd4-d87c-4c2f-a960-06b6f22e9923" />
<img width="1917" height="1043" alt="Screenshot From 2026-06-11 15-51-04" src="https://github.com/user-attachments/assets/4ad3961a-af1b-429f-8d8f-c604e074f9a3" />


* Revenue & Sales KPIs
* Profitability Metrics
* Inventory Analytics
* Revenue by Category
* Revenue by City
* Revenue by Region
* Top Brands & Products
* Customer Segmentation
* Payment Method Analysis

### Live Orders Dashboard
<img width="1917" height="1108" alt="Screenshot From 2026-06-11 15-51-24" src="https://github.com/user-attachments/assets/2f4e129e-ac42-4dd2-a216-2b0c4387a883" />


* Real-Time Order Feed
* Orders Per Minute
* Orders Per 5 Minutes
* Revenue Per Hour
* Active Customers

### Monitoring Dashboard
<img width="1917" height="1108" alt="Screenshot From 2026-06-11 15-51-30" src="https://github.com/user-attachments/assets/81f85b10-7b55-4249-9ee7-1be6911fed3a" />


* PostgreSQL Health
* Kafka Health
* Spark Health
* Airflow Health
* Data Quality Metrics
* Pipeline Monitoring
* System Health Score

## Database Tables

### Core Tables

* customers
* products
* orders

### Analytics Tables

* dashboard_summary
* profit_summary
* inventory_summary
* sales_by_category
* sales_by_city
* sales_by_region
* sales_by_brand
* top_products
* top_customers

## API Endpoints

### Analytics

```http
GET /dashboard-summary
GET /profit-summary
GET /inventory-summary
GET /sales-by-category
GET /sales-by-city
GET /sales-by-region
GET /sales-by-brand
GET /top-products
GET /top-customers
```

### Live Orders

```http
GET /recent-orders
GET /live-stats
```

### Monitoring

```http
GET /system-health
GET /data-quality
```

## Running the Project

```bash
docker compose up -d
```

Access:

* Frontend: http://localhost:5173
* Backend API: http://localhost:8000
* Airflow: http://localhost:8081
* Spark UI: http://localhost:8080

## Learning Outcomes

This project demonstrates:

* Real-Time Data Processing
* Event-Driven Architecture
* Stream Processing with Spark
* Workflow Orchestration with Airflow
* Backend API Development
* Dashboard Development
* Dockerized Deployment
* Data Engineering Fundamentals
