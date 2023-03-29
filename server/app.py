from flask import Flask, request, make_response, jsonify, session, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from werkzeug.exceptions import NotFound, Unauthorized

from config import db, app, api
from models import User, Trainer, Workout, Review

# app = Flask(__name__)
# CORS(app)
# bcrypt = Bcrypt(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

# migrate = Migrate(app, db)
# db.init_app(app)

api = Api(app)

# class Index(Resource):
#     def get(self):
#         return '<h1>hi</h1>'
# api.add_resource(Index, '/')

class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(name=form_json['name'], email=form_json['email'])
        new_user.password_hash = form_json['password']
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try: 
            user = User.query.filter_by(name=request.get_json()['name']).first()
            # import ipdb
            # ipdb.set_trace()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except:
            abort(401, "Incorrect Username or Password")
api.add_resource(Login, '/login')

class AuthorizedSession(Resource):
    def get(self):
        try: 
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")
api.add_resource(AuthorizedSession, '/authorized')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/logout')

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )
    return response
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

class Reviews(Resource):
    def get(self):
        review_list = [r.to_dict() for r in Review.query.all()]
        response = make_response(
            review_list,
            200
        )
        return response
api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)