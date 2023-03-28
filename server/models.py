from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Trainer(db.Model, SerializerMixin):
    __tablename__ = 'trainers'

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    name = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    time = db.Column(db.DateTime, server_default=db.func.now())
    description = db.Column(db.String)

    trainers = db.relationship('Trainer', backref='workout')