from fastapi import HTTPException, status

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="incorrect email or password",
    headers={"WWW-Authenticate": "Bearer"},
)

registration_exception = HTTPException(
    status_code=status.HTTP_306_RESERVED,
    detail="email already exists",
    headers={"WWW-Authenticate": "Bearer"},
)

no_user_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="email does not exists",
    headers={"WWW-Authenticate": "Bearer"},
)

database_error_exception = HTTPException(
    status_code=status.HTTP_408_REQUEST_TIMEOUT,
    detail="cassandra error, try again",
    headers={"WWW-Authenticate": "Bearer"},
)

invalid_token_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="token error. logout and try again.",
    headers={"WWW-Authenticate": "Bearer"},
)

create_exception = HTTPException(
        status_code=status.HTTP_408_REQUEST_TIMEOUT,
        detail='create error',
        headers={"WWW-Authenticate": "Bearer"},
)

read_exception = HTTPException(
        status_code=status.HTTP_408_REQUEST_TIMEOUT,
        detail='read error',
        headers={"WWW-Authenticate": "Bearer"},
)


def unknown_exception_from(detail="unknown exception. internal server error."):
    unknown_exception = HTTPException(
        status_code=status.HTTP_408_REQUEST_TIMEOUT,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )

    return unknown_exception
