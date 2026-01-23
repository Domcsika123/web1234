from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, Literal
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    budget: Optional[Literal["under-500k", "500k-1m", "1m-2m", "above-2m"]] = None
    message: str = Field(..., min_length=10, max_length=2000)

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('A név mező kötelező')
        return v.strip()

    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Az üzenet mező kötelező')
        return v.strip()

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Kiss Anna",
                "email": "anna@example.com",
                "phone": "+36 30 123 4567",
                "budget": "500k-1m",
                "message": "Szeretnék egy weboldalt a vállalkozásomnak..."
            }
        }


class Contact(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    phone: Optional[str] = None
    budget: Optional[str] = None
    message: str
    status: Literal["new", "contacted", "in-progress", "closed"] = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "name": "Kiss Anna",
                "email": "anna@example.com",
                "phone": "+36 30 123 4567",
                "budget": "500k-1m",
                "message": "Szeretnék egy weboldalt...",
                "status": "new",
                "created_at": "2025-01-23T10:30:00Z",
                "updated_at": "2025-01-23T10:30:00Z"
            }
        }
