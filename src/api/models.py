from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }
    
class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, unique=True, nullable=False)
    time = db.Column(db.DateTime, unique=True, nullable=False)
    location = db.Column(db.String, unique=True, nullable=False)
    liters = db.Column(db.Float, unique=True, nullable=False)

    def __repr__(self):
        return f'<UserData {self.date} {self.time} {self.location} {self.liters}>'

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "time": self.time,
            "location": self.location,
            "liters": self.liters,
        }
