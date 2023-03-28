from faker import Faker
from app import app
from models import db, Trainer, Workout

fake = Faker()

with app.app_context():
    Trainer.query.delete()

    trainers = []
    t1 = Trainer(name='Topher', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/chad.jpeg?raw=true', bio='Cool dude')
    trainers.append(t1)
    t2 = Trainer(name='Diana', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/wonderwoman.jpg?raw=true', bio='Cool chick')
    trainers.append(t2)
    t3 = Trainer(name='Brett', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/We_Can_Do_It__qhtlbj.jpg?raw=true', bio='The coolest')
    trainers.append(t3)
    db.session.add_all(trainers)
    db.session.commit()

    workouts = []
    w1 = Workout(name='Curls', description='Gettin swoll')
    workouts.append(w1)
    db.session.add_all(workouts)
    db.session.commit()
# from app import app
# from models import db, User

# user = User(name='diana', password='12345')
# db.session.add(user)
# db.session.commit()
