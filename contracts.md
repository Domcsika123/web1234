# WebForge - Backend Integration Contracts

## Overview
A WebForge weboldal jelenleg mock adatokkal működik. A backend integrációval a kapcsolati űrlap valódi adatbázisba fog menteni, és admin felületet kap az üzenetek megtekintésére.

## Current Mock Data (mockData.js)
- `heroData` - statikus szövegek
- `features` - 8 feature kártya (statikus)
- `process` - 5 lépéses folyamat (statikus)
- `testimonials` - 3 vélemény (statikus)
- `caseStudies` - 3 referencia (statikus)
- `faqData` - 6 GYIK (statikus)
- `whyUs` - 4 előny (statikus)
- `contactInfo` - elérhetőségek (statikus)

**Csak a contact form lesz backend-integráció, a többi statikus marad.**

---

## API Endpoints

### 1. POST /api/contact
**Cél:** Kapcsolati űrlap beküldése

**Request Body:**
```json
{
  "name": "Kiss Anna",
  "email": "anna@example.com",
  "phone": "+36 30 123 4567",
  "budget": "500k-1m",
  "message": "Szeretnék egy weboldalt a fodrászatomnak..."
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Üzeneted sikeresen elküldve! 24 órán belül válaszolunk.",
  "contactId": "507f1f77bcf86cd799439011"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Hiányzó kötelező mezők: name, email, message"
}
```

---

### 2. GET /api/contacts
**Cél:** Összes kapcsolati üzenet lekérése (admin)

**Query Parameters:**
- `limit` (optional): Maximális eredmények száma (default: 100)
- `skip` (optional): Kihagyandó elemek száma (pagination)

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 15,
  "contacts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Kiss Anna",
      "email": "anna@example.com",
      "phone": "+36 30 123 4567",
      "budget": "500k-1m",
      "message": "Szeretnék egy weboldalt...",
      "status": "new",
      "createdAt": "2025-01-23T10:30:00Z",
      "updatedAt": "2025-01-23T10:30:00Z"
    }
  ]
}
```

---

### 3. GET /api/contacts/:id
**Cél:** Egy konkrét kapcsolati üzenet lekérése

**Response (Success - 200):**
```json
{
  "success": true,
  "contact": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kiss Anna",
    "email": "anna@example.com",
    "phone": "+36 30 123 4567",
    "budget": "500k-1m",
    "message": "Szeretnék egy weboldalt...",
    "status": "new",
    "createdAt": "2025-01-23T10:30:00Z"
  }
}
```

---

## Database Schema

### Contact Model (MongoDB)
```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  email: String (required, valid email format),
  phone: String (optional, max 20 chars),
  budget: String (optional, enum: ["under-500k", "500k-1m", "1m-2m", "above-2m"]),
  message: String (required, max 2000 chars),
  status: String (default: "new", enum: ["new", "contacted", "in-progress", "closed"]),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Frontend Integration Changes

### ContactForm.jsx
**Jelenlegi állapot:** Mock submission, localStorage
**Változtatás:**
1. Axios POST kérés a `/api/contact` endpoint-ra
2. Valódi backend válasz kezelése
3. Hibaüzenetek megjelenítése toast-tal
4. Loading állapot a gomb alatt

**Kód változás:**
```javascript
// ELŐTTE (mock):
const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitted(true);
  toast({ title: "Sikeres küldés!", description: "24 órán belül válaszolunk." });
};

// UTÁNA (backend):
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axios.post(`${API}/contact`, formData);
    toast({ title: "Sikeres küldés!", description: response.data.message });
    setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
  } catch (error) {
    toast({ 
      title: "Hiba történt", 
      description: error.response?.data?.error || "Próbáld újra később.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};
```

---

## Backend Implementation Plan

### Fájlok:
1. `/app/backend/models/contact.py` - Contact adatmodell
2. `/app/backend/routes/contact_routes.py` - API endpoints
3. `/app/backend/server.py` - Router beépítése

### Validációk:
- Name: kötelező, 1-100 karakter
- Email: kötelező, valid email formátum
- Phone: opcionális, max 20 karakter
- Budget: opcionális, csak előre definiált értékek
- Message: kötelező, 10-2000 karakter

### Error handling:
- 400: Validation errors
- 500: Server errors
- Minden error logolva console-ra

---

## Testing Checklist

### Backend Testing:
- [ ] POST /api/contact valid adatokkal
- [ ] POST /api/contact invalid email-lel (hibaüzenet)
- [ ] POST /api/contact hiányzó name mezővel
- [ ] POST /api/contact túl hosszú message-dzsel
- [ ] GET /api/contacts (üres lista)
- [ ] GET /api/contacts (3+ elem listázása)
- [ ] MongoDB-ben megjelennek az adatok

### Frontend Testing:
- [ ] Űrlap kitöltése és sikeres beküldés
- [ ] Toast megjelenik sikeres küldés után
- [ ] Form mezők kiürülnek beküldés után
- [ ] Hibaüzenet invalid email esetén
- [ ] Loading state a gombban küldés alatt
- [ ] Hiányzó kötelező mező esetén hibaüzenet

---

## Notes
- Statikus tartalmak (features, testimonials, etc.) mock-ban maradnak - nincs szükség backend-re
- Admin felület egyszerű lesz: GET /api/contacts hívás listázáshoz
- Opcionális jövőbeli fejlesztés: email értesítés új üzenet esetén
