from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional, Literal
from datetime import datetime


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    budget: Optional[Literal["under-500k", "500k-1m", "1m-2m", "above-2m"]] = None
    message: str = Field(..., min_length=10, max_length=2000)

    @field_validator('name')
    @classmethod
    def name_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('A név mező kötelező')
        return v.strip()

    @field_validator('message')
    @classmethod
    def message_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Az üzenet mező kötelező')
        return v.strip()

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Kiss Anna",
                "email": "anna@example.com",
                "phone": "+36 30 123 4567",
                "budget": "500k-1m",
                "message": "Szeretnék egy weboldalt a vállalkozásomnak..."
            }
        }
    }


class Contact(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    budget: Optional[str] = None
    message: str
    status: Literal["new", "contacted", "in-progress", "closed"] = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "json_schema_extra": {
            "example": {
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
    }
