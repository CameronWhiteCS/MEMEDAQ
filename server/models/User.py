from bcrypt import hashpw, checkpw, gensalt
from __main__ import db

class User(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String(16), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    balance = db.Column(db.Integer, nullable=False, default=100)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    portfolio_items = db.relationship('PortfolioItem')

    def __init__(self, username, password):
        self.username = username
        self.password_hash = hashpw(bytes(password.encode('utf-8')), bytes(gensalt()))


