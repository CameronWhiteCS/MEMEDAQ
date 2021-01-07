from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_limiter import Limiter
from threading import Timer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://memedaq:password@localhost/memdaq'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'asdf'

cors = CORS(app)

limiter = Limiter(app)

db = SQLAlchemy(app)

from models import *
from routes import *
from algorithms import price_fuzz, cringe_decay
db.create_all()



def price_fuzz_loop():
    price_fuzz()
    Timer(3600 * 2, price_fuzz_loop).start()

def cringe_decay_loop():
    cringe_decay()
    Timer(3600 * 24, cringe_decay_loop).start()

if __name__ == '__main__':
    price_fuzz_loop()
    cringe_decay_loop()
    app.run()
