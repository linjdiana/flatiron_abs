from faker import Faker
from app import app
from models import db, Trainer

fake = Faker()

with app.app_context():
    Trainer.query.delete()

    trainers = []

    t1 = Trainer(name='Topher', image='https://imgur.com/a/mFpmk9W', bio='Cool dude')

    trainers.append(t1)

    t2 = Trainer(name='Diana', image='https://imgur.com/q3Pbe4s', bio='Cool chick')

    trainers.append(t2)

    t3 = Trainer(name='Brett', image='https://imgur.com/O1u3I46', bio='The coolest')

    trainers.append(t3)

    db.session.add_all(trainers)
    db.session.commit()