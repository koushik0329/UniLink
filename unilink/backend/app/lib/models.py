from cassandra.cqlengine.models import Model
from cassandra.cqlengine import columns
import uuid
from datetime import datetime


class UserCredentials(Model):
    email = columns.Text(primary_key=True)
    hashed_password = columns.Text()


class UserInfo(Model):
    email = columns.Text(primary_key=True)
    name = columns.Text(index=True)


class UserConnections(Model):
    from_email = columns.Text(primary_key=True)
    to_email = columns.Text(primary_key=True)

    from_name = columns.Text()
    to_name = columns.Text()


class Posts(Model):
    email = columns.Text(primary_key=True, partition_key=True)
    xtimestamp = columns.DateTime(
        primary_key=True, clustering_order="DESC", default=datetime.now
    )

    id = columns.UUID(primary_key=True, default=uuid.uuid4)
    title = columns.Text()
    description = columns.Text()
    interested = columns.Integer(default=0)

class InterestedPosts(Model):
    email = columns.Text(primary_key=True, partition_key=True)
    post_id = columns.UUID(primary_key=True)
    xtimestamp = columns.DateTime(primary_key=True, clustering_order="DESC", default=datetime.now)


# from cassandra.cqlengine.management import sync_table

# sync_table(UserCredentials)
# sync_table(UserInfo)
# sync_table(Pins)
