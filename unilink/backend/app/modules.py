from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

from app.auth import auth
from app.users import users
from app.search import search
from app.crud import crud
from app.feed import feed

from app.lib.connections import *
from app.feed import prodcon