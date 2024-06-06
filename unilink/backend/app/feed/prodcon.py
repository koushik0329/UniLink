from kafka import KafkaProducer
from kafka import KafkaConsumer
import json

topic = "events"
key = "unilink"

print("INFO : KAFKA PRODUCER CONNECTION : SETTING UP")
producer = KafkaProducer(
    key_serializer=lambda k: k.encode("utf-8"),
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
    bootstrap_servers="subtle-cub-6269-us1-kafka.upstash.io:9092",
    sasl_mechanism="SCRAM-SHA-256",
    security_protocol="SASL_SSL",
    sasl_plain_username="c3VidGxlLWN1Yi02MjY5JENd3sgr9DMIjNGJ8Fidtm00fQzTTVA5M-Lg5i_2FVg",
    sasl_plain_password="YWZmZGY4ZTUtYTNiMy00MjQzLWE5ZDMtNzk2NGVjNzI3NDQw",
)
print("INFO : KAFKA PRODUCER CCONNECTION : SUCCESS")

print("INFO : KAFKA CONSUMER CONNECTION : SETTING UP")
consumer = KafkaConsumer(
    "events",
    key_deserializer=lambda k: k.decode("utf-8"),
    value_deserializer=lambda v: json.loads(v.decode("utf-8")),
    bootstrap_servers="subtle-cub-6269-us1-kafka.upstash.io:9092",
    sasl_mechanism="SCRAM-SHA-256",
    security_protocol="SASL_SSL",
    sasl_plain_username="c3VidGxlLWN1Yi02MjY5JENd3sgr9DMIjNGJ8Fidtm00fQzTTVA5M-Lg5i_2FVg",
    sasl_plain_password="YWZmZGY4ZTUtYTNiMy00MjQzLWE5ZDMtNzk2NGVjNzI3NDQw",
    group_id="YOUR_CONSUMER_GROUP",
    auto_offset_reset="earliest",
)
print("INFO : KAFKA CONSUMER CONNECTION : SUCCESS")
