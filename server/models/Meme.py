from __main__ import db
import datetime

class Meme(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    image_url = db.Column(db.String(1024), nullable=False)
    trading_price = db.Column(db.Integer, nullable=False, default=1000)
    stock = db.Column(db.Integer, nullable=False, default=10000)
    cringe = db.Column(db.Boolean, nullable=False, default=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    price_points = db.relationship('PricePoint', cascade='all, delete')
    portfolio_items = db.relationship('PortfolioItem', cascade='all, delete')

    def __init__(self, name, image_url, trading_price=1000, stock=10000):
        self.name = name
        self.image_url = image_url
        self.trading_price = trading_price
        self.stock = stock
