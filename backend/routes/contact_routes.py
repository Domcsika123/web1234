from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.contact import ContactCreate
from datetime import datetime
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)


async def create_contact(contact_data: dict, db: AsyncIOMotorDatabase):
    """
    Create a new contact form submission
    """
    try:
        # Validate input data
        contact = ContactCreate(**contact_data)
        
        # Prepare contact document
        contact_dict = contact.dict()
        contact_dict["status"] = "new"
        contact_dict["created_at"] = datetime.utcnow()
        contact_dict["updated_at"] = datetime.utcnow()

        # Insert into database
        result = await db.contacts.insert_one(contact_dict)
        
        logger.info(f"New contact form submission from {contact.email}")
        
        return {
            "success": True,
            "message": "Üzeneted sikeresen elküldve! 24 órán belül válaszolunk.",
            "contactId": str(result.inserted_id)
        }
    
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Hiba történt az üzenet küldése során. Kérjük, próbáld újra később."
        )


async def get_all_contacts(db: AsyncIOMotorDatabase, limit: int = 100, skip: int = 0):
    """
    Get all contact form submissions (admin)
    """
    try:
        # Get contacts with pagination
        contacts_cursor = db.contacts.find().sort("created_at", -1).skip(skip).limit(limit)
        contacts = await contacts_cursor.to_list(length=limit)
        
        # Convert ObjectId to string
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        
        # Get total count
        total_count = await db.contacts.count_documents({})
        
        return {
            "success": True,
            "count": total_count,
            "contacts": contacts
        }
    
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Hiba történt az üzenetek lekérése során."
        )


async def get_contact_by_id(contact_id: str, db: AsyncIOMotorDatabase):
    """
    Get a specific contact by ID
    """
    try:
        # Validate ObjectId
        if not ObjectId.is_valid(contact_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Érvénytelen contact ID"
            )
        
        # Find contact
        contact = await db.contacts.find_one({"_id": ObjectId(contact_id)})
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact nem található"
            )
        
        # Convert ObjectId to string
        contact["_id"] = str(contact["_id"])
        
        return {
            "success": True,
            "contact": contact
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact {contact_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Hiba történt az üzenet lekérése során."
        )
