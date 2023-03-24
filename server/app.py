from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Trainer
app = Flask(__name__)

CORS(app)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newsletters.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

# api = Api(app)

@app.route('/')
def index():
    return '<h1>hi</h1>'

# @app.route('/trainers', methods=['GET'])
# def movies():
#     response_dict = {
#         "text": "Trainers will go here"
#     }

#     return make_response(jsonify(response_dict), 200)



if __name__ == '__main__':
    app.run(port=5555)