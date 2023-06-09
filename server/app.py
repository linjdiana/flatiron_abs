from flask import request, make_response, jsonify, session, abort
from flask_restful import Resource, Api
from werkzeug.exceptions import NotFound, Unauthorized
from config import db, app, api
from models import User, Trainer, Workout, Review, Signup

@app.route('/')
def index():
    return '<h1>hi</h1>'

api = Api(app)

class Users(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        response = make_response(
            user.to_dict(), 200
        )
        return response
api.add_resource(Users, '/user')

class Signups(Resource):
    def get(self):
        signup_list = [s.to_dict() for s in Signup.query.all()]
        response = make_response(
            signup_list,
            200
        )
        return response
    def post(self):
        data=request.get_json()
        new_sign_up = Signup(
            user_id=session['user_id'],
            workout_id=data['workout_id']
        )
        db.session.add(new_sign_up)
        db.session.commit()

        response = make_response(
            new_sign_up.to_dict(),
            201
        )
        return response
api.add_resource(Signups, '/signup')

class SignupById(Resource):
    def delete(self, id):
        sign_up = Signup.query.filter_by(id=id).first()
        if not sign_up:
            return make_response({
                "errors": "Sign Up not found"
            }, 404)
        db.session.delete(sign_up)
        db.session.commit()
        return make_response('deleted', 200)
api.add_resource(SignupById, '/signup/<int:id>')

class AddUser(Resource):
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
api.add_resource(AddUser, '/adduser')

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
    
    def post(self):
        data=request.get_json()
        new_review = Review(
            user=data['name'],
            rating=data['rating'],
            user_id=session['user_id'],
            # workout_id=data['workout_id'],
            text=data['text']
        )
        db.session.add(new_review)
        db.session.commit()

        response = make_response(
            new_review.to_dict(),
            201
        )
        return response
api.add_resource(Reviews, '/reviews')

if __name__ == '__main__':
    app.run(port=5555, debug=True)