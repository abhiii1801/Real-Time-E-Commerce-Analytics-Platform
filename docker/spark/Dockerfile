FROM apache/spark:3.5.6

USER root

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    wget

COPY requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

COPY jars /opt/spark/jars/

RUN mkdir -p /home/spark/.ivy2/cache
RUN mkdir -p /home/spark/.ivy2/jars

USER spark