from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import JSONResponse

from app.lib.models import *
from app.lib.exceptions import *
from app.lib.helpers import validateAuth


router = APIRouter(prefix="/users", tags=["/users"])


@router.get("/auth-info")
async def get_auth_info(email: str = Depends(validateAuth)):

    auth_info = UserInfo.get(email=email)
    response = dict(auth_info)
    return response


@router.get("/user-info")
async def get_user_info(user_email: str, email: str = Depends(validateAuth)):
    try:
        user_info = UserInfo.get(email=user_email)
        response = dict(user_info)
        return response
    except:
        raise no_user_exception


@router.get("/auth-connections")
async def get_auth_connections(email: str = Depends(validateAuth)):

    user_email = email

    try:
        user_connections = list()

        from_connections = UserConnections.objects(from_email=user_email)
        to_connections = UserConnections.objects(to_email=user_email).allow_filtering()

        for iconnection in from_connections:
            user_connection = {
                "email": iconnection.to_email,
                "name": iconnection.to_name,
            }
            user_connections.append(user_connection)
        for iconnection in to_connections:
            user_connection = {
                "email": iconnection.from_email,
                "name": iconnection.from_name,
            }
            user_connections.append(user_connection)

        response = {"auth_connections": user_connections}
        return response
    except Exception as e:
        # print(e)
        error_message = "INFO : /auth-connections error"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.get("/user-connections")
async def get_user_connections(user_email: str, email: str = Depends(validateAuth)):

    try:
        user_connections = list()

        from_connections = UserConnections.objects(from_email=user_email)
        to_connections = UserConnections.objects(to_email=user_email).allow_filtering()

        for iconnection in from_connections:
            user_connection = {
                "email": iconnection.to_email,
                "name": iconnection.to_name,
            }
            user_connections.append(user_connection)
        for iconnection in to_connections:
            user_connection = {
                "email": iconnection.from_email,
                "name": iconnection.from_name,
            }
            user_connections.append(user_connection)

        response = {"user_connections": user_connections}
        return response
    except Exception as e:
        # print(e)
        error_message = "INFO : /user-connections error"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.post("/add-connection")
def add_connection(user_email: str, email: str = Depends(validateAuth)):

    from_email = email
    to_email = user_email

    try:
        from_name = UserInfo.get(email=from_email).name
        to_name = UserInfo.get(email=to_email).name
    except Exception as e:
        # print(e)
        error_message = "INFO : /add-connection : users not found"
        print("INFO : /add-connection : users not found")
        raise unknown_exception_from(detail=error_message)

    try:
        UserConnections.create(
            from_email=from_email,
            to_email=to_email,
            from_name=from_name,
            to_name=to_name,
        )
        return {"detail": "success"}
    except Exception as e:
        # print(e)
        error_message = "INFO : /add-connection : unable to create user connection"
        print(error_message)
        raise unknown_exception_from(detail=error_message)


@router.delete("/remove-connection")
def remove_connection(user_email: str, email: str = Depends(validateAuth)):

    auth_email = email

    try:
        connection_to_delete = UserConnections.objects.get(
            from_email=user_email, to_email=auth_email
        )
        connection_to_delete.delete()
        print(f"Connection from {user_email} to {auth_email} deleted.")
    except UserConnections.DoesNotExist:
        print(f"Connection from {user_email} to {auth_email} not found.")
    except Exception as e:
        error_message = "INFO : /remove-connection : 1"
        print(error_message)
        raise unknown_exception_from(detail=error_message)

    try:
        connection_to_delete = UserConnections.objects.get(
            from_email=auth_email, to_email=user_email
        )
        connection_to_delete.delete()
        print(f"Connection from {auth_email} to {user_email} deleted.")
    except UserConnections.DoesNotExist:
        print(f"Connection from {auth_email} to {user_email} not found.")
    except Exception as e:
        error_message = "INFO : /remove-connection : 2"
        print(error_message)
        raise unknown_exception_from(detail=error_message)

    response = {"status": "success"}
    return response
