from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from models import db, Trainer, User
app = Flask(__name__)

CORS(app)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newsletters.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    return '<h1>hi</h1>'

# @app.route('/trainers', methods=['GET'])
# def movies():
#     response_dict = {
#         "text": "Trainers will go here"
#     }

#     return make_response(jsonify(response_dict), 200)

# class Users(Resource):
#     def post(self):
#         form_json = request.get_json()
#         new_user = User(
#             name=form_json['name'],
#             email=form_json['email']
#         )
#         db.session.add(new_user)
#         db.session.commit()
#         session['user_id'] = new_user.id

class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(name=form_json['name'], email=form_json['email'], _password_hash=form_json['password'])
        new_user.password_hash = form_json['password']
        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            new_user.to_dict(),
            201
        )
        return response
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555)