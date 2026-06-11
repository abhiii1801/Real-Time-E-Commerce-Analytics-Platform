FROM ecommerce-analytics-spark-master

WORKDIR /opt/project

CMD ["/opt/spark/bin/spark-submit", "--master", "spark://spark-master:7077", "/opt/project/spark-jobs/streaming/stream_orders.py"]