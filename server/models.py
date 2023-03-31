from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @validates('name')
    def validates_name(self, key, value):
        if any(char.isdigit() for char in value):
            raise ValueError('Name must be a string')
        return

    @validates('email')
    def validates_name(self, key, value):
        emails_list = User.query.all()
        emails = [email.email for email in emails_list]
        if value in emails:
            raise ValueError('Email already exists') 
        return

    @hybrid_property 
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Trainer(db.Model, SerializerMixin):
    __tablename__ = "trainers"

    serialize_rules = ('-workout',) 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)

    workout = db.relationship('Workout', back_populates='trainer')

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    serialize_rules = ('-review', '-trainer.bio', '-trainer.image', '-trainer.id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    time = db.Column(db.String)
    description = db.Column(db.String)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))

    trainer = db.relationship('Trainer', back_populates='workout')
    review = db.relationship('Review', back_populates='workout')


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-trainer_id', '-workout_id', '-workout.description', '-workout.id', '-workout.name', '-workout.trainer_id')

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))
    rating = db.Column(db.String)
    text = db.Column(db.String)

    workout = db.relationship('Workout', back_populates='review')

class Signup(db.Model, SerializerMixin):
    __tablename__  = 'signups'

    serialize_rules = ('-trainer', '-workout.signups') 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    workout = db.relationship('Workout', backref='signups')
