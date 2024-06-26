from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
 
db = SQLAlchemy()
 
def get_uuid():
    return uuid4().hex
 
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class HealthRecord(db.Model):
    __tablename__ = "health_records"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(11), db.ForeignKey('users.id'), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)