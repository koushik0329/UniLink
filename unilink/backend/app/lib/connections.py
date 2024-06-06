import json

from cassandra.auth import PlainTextAuthProvider
from cassandra.cluster import Cluster
from cassandra.cqlengine import connection

import redis


# def get_datastax_session(bundle_location, token_location, keyspace):
#     cloud_config = {"secure_connect_bundle": bundle_location}

#     secrets = json.load(open(token_location))
#     CLIENT_ID, CLIENT_SECRET = secrets["clientId"], secrets["secret"]
#     auth_provider = PlainTextAuthProvider(CLIENT_ID, CLIENT_SECRET)

#     cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
#     session = cluster.connect(keyspace=keyspace)
#     return session


# def set_datastax_connection():
#     connection_config = {
#         "bundle_location": "D:\\projects\\unilink\\backend\datastax-instance\\bundle.zip",
#         "token_location": "D:\\projects\\unilink\\backend\datastax-instance\\token.json",
#         "keyspace": "unispace",
#     }
#     session = get_datastax_session(**connection_config)

#     connection.register_connection(name="default", session=session, default=True)
#     connection.set_default_connection("default")
#     connection.set_session(session)


def set_cassandra_connection():

    cluster = Cluster()
    session = cluster.connect("unilinkspace")

    connection.register_connection(name="default", session=session, default=True)
    connection.set_default_connection("default")
    connection.set_session(session)


def get_redis_connection():
    r = redis.Redis(
        host="usw1-popular-dassie-34565.upstash.io",
        port=34565,
        password="e22eab55e6f541adbef9e7f271e0cb49",
    )
    return r


cassandra_enable = False
cassandra_enable = True

redis_enable = False
redis_enable = True

if cassandra_enable:
    print("INFO : CONNECTING TO CASSANDRA")
    set_cassandra_connection()
    # set_datastax_connection()
    print("INFO : SUCCESS CONNECTION TO CASSANDRA")

if not cassandra_enable:
    print("INFO : CASSANDRA CONNECTION NOT SETUP")


r = None

if redis_enable:
    print("INFO : CONNECTING TO REDIS")
    r = get_redis_connection()
    print("INFO : CONNECTION TO REDIS SUCCESS")

if not redis_enable:
    r = redis.Redis()
    print("INFO : REDIS CONNECTION NOT SETUP")
