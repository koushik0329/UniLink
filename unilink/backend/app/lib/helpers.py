from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from jose import jwt

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from app.lib.exceptions import invalid_token_exception
from app.lib.connections import r

# from lib.exceptions import invalid_token_exception
# from lib.connections import r


ACCESS_TOKEN_SECRET = "70b159270abc185e853b00bc01e7f34640fa1f4a20aa51334e6db29afe19c119"
JWT_ALGORITHM = "HS256"
TOKEN_DURATION_SECONDS = 60*60*60

oauth2scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
token_duration = timedelta(seconds=int(TOKEN_DURATION_SECONDS))
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    hashed_password = pwd_context.hash(password)
    return hashed_password


def isPasswordsMatch(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def getAccessToken(data, duration: timedelta = token_duration):
    payload = {
        "sub": data,
        "exp": datetime.now(timezone.utc) + duration,
    }

    access_token = jwt.encode(
        payload,
        ACCESS_TOKEN_SECRET,
        algorithm=JWT_ALGORITHM,
    )
    return access_token


def getPayload(token):
    try:
        payload = jwt.decode(
            token,
            ACCESS_TOKEN_SECRET,
            algorithms=JWT_ALGORITHM,
        )
        return payload
    except:
        return None


def validateAuth(token: str = Depends(oauth2scheme)):
    try:
        email = r.get(token).decode("utf-8")
        return email
    except:
        pass

    try:
        payload = getPayload(token)
        email = payload["sub"]
        return email
    except:
        raise invalid_token_exception
