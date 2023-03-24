from faker import Faker
from app import app
from models import db, Trainer

fake = Faker()

with app.app_context():
    Trainer.query.delete()

    trainers = []

    t1 = Trainer(name='topher')

    trainers.append(t1)

    db.session.add_all(trainers)
    db.session.commit()