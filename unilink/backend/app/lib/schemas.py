from pydantic import BaseModel

from pydantic import EmailStr
from pydantic import SecretStr

from fastapi import Form
from typing import Optional


class UserCredentialsSchema(BaseModel):
    email: EmailStr
    password: SecretStr


class RegisterForm(BaseModel):
    name: str
    email: EmailStr
    password: SecretStr

    @classmethod
    def as_form(
        cls,
        name: str = Form(...),
        email: EmailStr = Form(...),
        password: SecretStr = Form(...),
    ):
        return cls(
            name=name,
            email=email,
            password=password,
        )


class PinForm(BaseModel):
    title: str

    @classmethod
    def as_form(
        cls,
        title: str = Form(...),
    ):
        return cls(
            title=title,
        )


# class PinForm(BaseModel):
#     title: str
#     link: Optional[str] = ""
#     image: bytes

#     @classmethod
#     def as_form(
#         cls,
#         title: str = Form(...),
#         link: str = Form(...),
#         image: bytes = Form(...),
#     ):
#         return cls(
#             title=title,
#             link=link,
#             image=image,
#         )
