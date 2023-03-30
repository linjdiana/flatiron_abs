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

    serialize_rules = ('-workouts',) 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)

    workout1 = db.relationship('Workout', back_populates='trainer')

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

<<<<<<< HEAD
    serialize_rules = ('-workouts', '-trainer.bio', '-trainer.image', '-trainer.id')
=======
    serialize_rules = ('-review', '-trainer.bio', '-trainer.image', '-trainer.id')
>>>>>>> brett

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    time = db.Column(db.DateTime, server_default=db.func.now())
    description = db.Column(db.String)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))

<<<<<<< HEAD
    trainer = db.relationship('Trainer', backref='workouts')
=======
    trainer = db.relationship('Trainer', back_populates='workout1')
    review = db.relationship('Review', back_populates='workout2')
    signup = db.relationship('Signup', back_populates='workout3')
    # trainer = db.relationship('Trainer', backref='workout')
>>>>>>> brett

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-trainer_id', '-workout_id', '-workout.description', '-workout.id', '-workout.name', '-workout.trainer_id')

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))
    # should rating be an integer?
    rating = db.Column(db.String)
    text = db.Column(db.String)

<<<<<<< HEAD
    workouts = db.relationship('Workout', backref='workouts')
=======
    workout2 = db.relationship('Workout', back_populates='review')
    # workout = db.relationship('Workout', backref='review')

class Signup(db.Model, SerializerMixin):
    __tablename__  = 'signups'

    serialize_rules = ('-review', '-trainer', '-workout1', '-workout2', '-workout3', '-signup')  

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))

    workout3 = db.relationship('Workout', back_populates='signup')
    # workout = db.relationship('Workout', backref='signup')
    # user = db.relationship('User', backref='signup')
    # review = db.relationship('Review', backref='signup')
    
>>>>>>> brett
