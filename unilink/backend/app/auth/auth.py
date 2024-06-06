from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from fastapi.responses import Response

from app.lib.connections import r

from app.lib.models import *
from app.lib.schemas import *

from app.lib.helpers import *
from app.lib.utils import *
from app.lib.exceptions import *

from cassandra.cqlengine.query import BatchQuery

router = APIRouter(prefix="/auth", tags=["/auth"])


@router.get("/check")
def check():
    response = {"auth endpoint status": "success"}
    return response


@router.get("/auth-check")
def auth_check(email: str = Depends(validateAuth)):

    response = {"token check / auth endpoint status": f"success : {email}"}
    return response


@router.post("/register")
def register(
    response: Response,
    register_form: RegisterForm = Depends(RegisterForm.as_form),
):
    name, email, password = dict(register_form).values()

    if isUserExistsByEmail(email=email):
        raise registration_exception

    hashed_password = hash_password(password.get_secret_value())

    try:
        batch = BatchQuery()
        UserCredentials.batch(batch).create(
            email=email,
            hashed_password=hashed_password,
        )
        UserInfo.batch(batch).create(
            email=email,
            name=name,
        )
        batch.execute()
    except Exception as e:
        print(e)
        raise database_error_exception

    access_token = getAccessToken(data=email)

    try:
        r.set(name=access_token, value=email)
        r.expire(name=access_token, time=TOKEN_DURATION_SECONDS)
    except:
        pass

    response = {"access_token": access_token}
    response = JSONResponse(response)
    response.set_cookie(
        key="access_token",
        value=access_token,
        expires=token_duration.seconds,
        httponly=True,
    )
    return response


@router.post("/login")
def login(formdata: OAuth2PasswordRequestForm = Depends()):

    email, recieved_password = formdata.username, formdata.password

    if not isUserExistsByEmail(email=email):
        raise no_user_exception

    correct_password = UserCredentials.get(email=email).hashed_password

    if not isPasswordsMatch(recieved_password, correct_password):
        raise credentials_exception

    access_token = getAccessToken(data=email)

    try:
        r.set(name=access_token, value=email)
        r.expire(name=access_token, time=TOKEN_DURATION_SECONDS)
    except Exception as e:
        print("ERROR: REDIS")
        pass

    response = {"access_token": access_token}
    response = JSONResponse(response)
    response.set_cookie(
        key="access_token",
        value=access_token,
        expires=token_duration.seconds,
        httponly=True,
    )
    return response


@router.get("/logout")
def logout(access_token: str = Depends(oauth2scheme)):

    try:
        r.delete(access_token)
    except:
        pass

    content = {"status": "success"}
    response = JSONResponse(content=content)
    response.delete_cookie(
        key="access_token",
        httponly=True,
    )
    return response
