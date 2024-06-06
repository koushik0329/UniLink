from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi import UploadFile, File

from fastapi import FastAPI
from fastapi.responses import JSONResponse
import base64

from app.lib.helpers import validateAuth
from app.lib.exceptions import *
from app.lib.utils import *

from app.lib.models import *
from app.lib.schemas import *

from app.feed.prodcon import *

router = APIRouter(prefix="/crud", tags=["/crud"])


@router.post("/create")
async def create_post(
    title: str = Form(...),
    description: str = Form(...),
    email: str = Depends(validateAuth),
):
    post = Posts(
        email=email,
        title=title,
        description=description,
    )
    post.save()

    try:
        event = {
            "event_type": "create",
            "post_id": post.id,
            "user_email": post.email,
            "title": post.title,
            "description": post.description,
        }
        producer.send(topic=topic, key=key, value=event)
        pass
    except:
        print("create event producer error")

    response = {"status": "success"}
    return response


@router.put("/update")
def update_post(
    postid: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    email: str = Depends(validateAuth),
):
    try:
        post = Posts.objects.allow_filtering().get(id=postid)
        post.title = title
        post.description = description
        post.save()
        return {"status": "success"}
    except Exception as e:
        # print(e)
        error_message = "INFO : /update : unable to update post. may not exist"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.delete("/delete")
def delete_post(postid: str, email: str = Depends(validateAuth)):
    try:
        Posts.objects.allow_filtering().get(id=postid).delete()
    except Exception as e:
        # print(e)
        error_message = "INFO : /delete : may already have been deleted"
        print(error_message)
        raise unknown_exception_from(detail=error_message)

    try:
        event = {
            "event_type": "delete",
            "post_id": post.id,
            "user_email": post.email,
            "description": post.description,
        }
        producer.send(topic=topic, key=key, value=event)
        pass
    except:
        print("create event producer error")

    response = {"status": "success"}
    return response


@router.get("/auth-posts")
def get_posts(email: str = Depends(validateAuth)):
    try:
        auth_posts = Posts.objects(email=email).all()

        response = []
        for auth_post in auth_posts:
            post = {
                "id": str(auth_post.id),
                "title": auth_post.title,
                "description": auth_post.description,
                "interested": auth_post.interested,
            }
            response.append(post)

        if not auth_posts:
            return []

        return JSONResponse(content=response)
    except Exception as e:
        # print(e)
        error_message = "INFO : /auth-posts : unable to send auth posts"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.get("/user-posts")
def get_user_posts(user_email: str, email: str = Depends(validateAuth)):
    try:
        user_posts = Posts.objects(email=user_email).all()
        auth_interested_ids = get_postids_interested_by_user(email=email)

        response = []
        for user_post in user_posts:
            post = {
                "id": str(user_post.id),
                "title": user_post.title,
                "description": user_post.description,
                "interested": user_post.interested,
                "isAuthInterested": user_post.id in auth_interested_ids,
            }
            response.append(post)

        if not user_posts:
            return []

        return JSONResponse(content=response)
    except Exception as e:
        print(e)
        error_message = "INFO : /user-posts : unable to send user posts"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.post("/interested")
def update_interested(
    post_id: str, user_email: str, email: str = Depends(validateAuth)
):
    try:
        post = Posts.objects(id=post_id).allow_filtering().first()
        if not post:
            return JSONResponse(status_code=404, content="Post not found")

        post.update(interested=post.interested + 1)

        interested_post = InterestedPosts(email=email, post_id=post_id)
        interested_post.save()

        response = {"status": "success"}
        return response
    except Exception as e:
        print(e)
        error_message = "INFO : /interested"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.delete("/uninterested")
def update_uninterested(
    post_id: str, user_email: str, email: str = Depends(validateAuth)
):
    try:
        post = Posts.objects(id=post_id).allow_filtering().first()
        if not post:
            return JSONResponse(status_code=404, content="Post not found")

        if post.interested > 0:
            post.update(interested=post.interested - 1)

        interested_post = InterestedPosts.objects(email=email, post_id=post_id).first()
        if interested_post:
            interested_post.delete()

        response = {"status": "success"}
        return response
    except Exception as e:
        print(e)
        error_message = "INFO : /uninterested"
        print(error_message)
        raise unknown_exception_from(detail=error_message)
