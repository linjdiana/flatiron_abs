from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
# db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    # admin = db.Column(db.String, default=False)

    @hybrid_property 
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

# from app import bcrypt 
class Trainer(db.Model, SerializerMixin):
    __tablename__ = "trainers"

    serialize_rules = ('-workout',) 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)
    

    # workouts = db.relationship('Workout', backref="trainer")
    # serialize_rules = ('-workouts.trainer',)

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    serialize_rules = ('-workout',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    time = db.Column(db.DateTime, server_default=db.func.now())
    description = db.Column(db.String)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))

    trainer = db.relationship('Trainer', backref='workout')
    # serialize_rules = ('-trainer.workouts',)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))
    
    rating = db.Column(db.String)
    text = db.Column(db.String)

    workout = db.relationship('Workout', backref='workout')
