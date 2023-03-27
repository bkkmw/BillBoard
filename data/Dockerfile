FROM python:3.7-alpine

WORKDIR /app/

COPY ./main.py /app/
COPY ./requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8000 main:app
