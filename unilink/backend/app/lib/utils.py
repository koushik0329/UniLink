from app.lib.models import *


def isUserExistsByEmail(email):
    result = UserCredentials.objects(email=email).limit(1)
    return bool(list(result))


def isUserExistsByName(name):
    result = UserCredentials.objects(name=name).limit(1)
    return bool(list(result))


def getUserByEmail(email):
    result = UserInfo.objects(email=email)
    return list(result)


def getUsersByName(name):
    result = UserInfo.objects(name=name)
    return list(result)


def get_postids_interested_by_user(email):
    interested_posts = InterestedPosts.objects(email=email)
    post_ids = [post.post_id for post in interested_posts]
    return post_ids


def get_posts_by_ids(post_ids):
    posts = Posts.objects(id__in=post_ids).allow_filtering()
    return posts
