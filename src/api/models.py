from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    level = db.Column(db.Integer, default=1)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "level": self.level, 
        }
    
class status ():
    pending = "pending"
    complete = "completed"
    invalid = "invalid"

class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, db.ForeignKey ('user.id'))
    start_time = db.Column(db.DateTime, unique=False, nullable=False)
    finish_time =db.Column(db.DateTime, unique=False, nullable=True)
    status = db.Column(db.String, unique=False, nullable=False)
    location = db.Column(db.String, unique=False, nullable=True)
    liters = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return f'<UserData {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "start_time": self.start_time,
            "finish_time": self.finish_time,
            "status": self.status.value, 
            "location": self.location,
            "liters": self.liters,
        }

