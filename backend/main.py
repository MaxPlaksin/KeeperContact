from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, JSON, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
import shutil

DATABASE_URL = 'sqlite:///./contacts.db'
SECRET_KEY = 'supersecretkey'  # В проде вынести в env
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
UPLOAD_DIR = './photos'
os.makedirs(UPLOAD_DIR, exist_ok=True)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

class UserDB(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    contacts = relationship('ContactDB', back_populates='owner')

class ContactDB(Base):
    __tablename__ = 'contacts'
    id = Column(Integer, primary_key=True, index=True)
    fio = Column(String, index=True)
    city = Column(String, index=True, nullable=True)
    position = Column(String, nullable=True)
    birthday = Column(String, nullable=True)
    car = Column(String, nullable=True)
    phones = Column(JSON, nullable=True)
    emails = Column(JSON, nullable=True)
    notes = Column(String, nullable=True)
    other = Column(JSON, nullable=True)
    photo = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship('UserDB', back_populates='contacts')

Base.metadata.create_all(bind=engine)

class User(BaseModel):
    id: Optional[int]
    username: str
    is_admin: bool = False
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Contact(BaseModel):
    id: Optional[int] = None
    fio: str
    city: Optional[str] = None
    position: Optional[str] = None
    birthday: Optional[str] = None
    car: Optional[str] = None
    phones: Optional[List[str]] = None
    emails: Optional[List[str]] = None
    notes: Optional[str] = None
    other: Optional[Dict[str, Any]] = None
    photo: Optional[str] = None
    owner_id: Optional[int] = None
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(UserDB).filter(UserDB.username == username).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_admin(current_user: UserDB = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

app = FastAPI()

@app.post('/register', response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(UserDB).filter(UserDB.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    db_user = UserDB(username=user.username, hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post('/token', response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get('/users/me', response_model=User)
def read_users_me(current_user: UserDB = Depends(get_current_user)):
    return current_user

@app.post('/contacts/', response_model=Contact)
def create_contact(contact: Contact, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    db_contact = ContactDB(**contact.dict(exclude_unset=True), owner_id=current_user.id)
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.get('/contacts/', response_model=List[Contact])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    if current_user.is_admin:
        return db.query(ContactDB).offset(skip).limit(limit).all()
    return db.query(ContactDB).filter(ContactDB.owner_id == current_user.id).offset(skip).limit(limit).all()

@app.get('/contacts/{contact_id}', response_model=Contact)
def read_contact(contact_id: int, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not contact or (not current_user.is_admin and contact.owner_id != current_user.id):
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@app.put('/contacts/{contact_id}', response_model=Contact)
def update_contact(contact_id: int, contact: Contact, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    db_contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not db_contact or (not current_user.is_admin and db_contact.owner_id != current_user.id):
        raise HTTPException(status_code=404, detail="Contact not found")
    for key, value in contact.dict(exclude_unset=True).items():
        setattr(db_contact, key, value)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.delete('/contacts/{contact_id}')
def delete_contact(contact_id: int, db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    db_contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not db_contact or (not current_user.is_admin and db_contact.owner_id != current_user.id):
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(db_contact)
    db.commit()
    return {"ok": True}

@app.post('/contacts/{contact_id}/photo')
def upload_photo(contact_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), current_user: UserDB = Depends(get_current_user)):
    db_contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not db_contact or (not current_user.is_admin and db_contact.owner_id != current_user.id):
        raise HTTPException(status_code=404, detail="Contact not found")
    filename = f"contact_{contact_id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    db_contact.photo = filename
    db.commit()
    db.refresh(db_contact)
    return {"filename": filename}

@app.get('/photos/{filename}')
def get_photo(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Photo not found")
    from fastapi.responses import FileResponse
    return FileResponse(file_path) 