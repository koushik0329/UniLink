from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.lib.helpers import validateAuth
from app.lib.exceptions import *
from app.lib.utils import *

router = APIRouter(prefix="/search", tags=["/users"])


@router.get("/search-user")
def get_users(quser: str, email: str = Depends(validateAuth)):

    search_result = []
    try:
        result = getUserByEmail(email=quser)
        search_result.append(result)

        result = getUsersByName(name=quser)
        search_result.append(result)

        flat_list = [d for sublist in search_result for d in sublist]
        search_result = [dict(t) for t in {tuple(sorted(d.items())) for d in flat_list}]
    except:
        return []

    response = {"search_result": search_result}
    return response


@router.get("/check")
def check():
    response = {"search endpoint : status": "success"}
    return response


@router.get("/auth-check")
def auth_check(email: str = Depends(validateAuth)):

    response = {"auth-check - status": f"success : {email}"}
    return response
