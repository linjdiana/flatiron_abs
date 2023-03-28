from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource

from models import db, Trainer, Workout
app = Flask(__name__)

CORS(app)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# class Index(Resource):
#     def get(self):
#         return '<h1>hi</h1>'
# api.add_resource(Index, '/')

class Trainers(Resource):
    def get(self):
        trainer_list = [t.to_dict() for t in Trainer.query.all()]
        response = make_response(
            trainer_list,
            200
        )
        return response
api.add_resource(Trainers, '/trainers')

class Workouts(Resource):
    def get(self):
        workout_list = [w.to_dict() for w in Workout.query.all()]
        response = make_response(
            workout_list,
            200
        )
        return response
api.add_resource(Workouts, '/workouts')

if __name__ == '__main__':
    app.run(port=5555)