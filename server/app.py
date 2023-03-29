from flask import request, make_response, jsonify, session, abort
from flask_restful import Resource, Api
from werkzeug.exceptions import NotFound, Unauthorized
from config import db, app, api
from models import User, Trainer, Workout

@app.route('/')
def index():
    return '<h1>hi</h1>'

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
class Trainers(Resource):
    def get(self):
        trainer_list = [t.to_dict() for t in Trainer.query.all()]
        response = make_response(
            trainer_list,
            200
        )
        return response
api.add_resource(Trainers, '/trainers')

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