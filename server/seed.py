from faker import Faker
from app import app
from models import db, Trainer

fake = Faker()

with app.app_context():
    Trainer.query.delete()

    trainers = []

    t1 = Trainer(name='Topher', image='https://www.shutterstock.com/image-photo/personal-trainer-arms-crossed-gym-260nw-493318507.jpg', bio='Cool dude')

    trainers.append(t1)

    t2 = Trainer(name='Diana', image='https://photobucket.com/u/TopherL2014/p/be4ad1ae-10fc-446d-9c85-a9311c6b6a52', bio='Cool chick')

    trainers.append(t2)

    t3 = Trainer(name='Brett', image='https://imgur.com/O1u3I46', bio='The coolest')

    trainers.append(t3)

    db.session.add_all(trainers)
    db.session.commit()