from __main__ import db
import datetime

class PricePoint(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    meme_id = db.Column(db.Integer, db.ForeignKey('meme.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())
    price = db.Column(db.Integer, nullable=False)

    def __init__(self, meme):
        self.meme_id = meme.id
        self.meme = meme
        self.price = meme.trading_price

    def as_dict(self):
        return {
            'id': self.id,
            'meme_id': self.meme_id,
            'date': self.date,
            'price': self.price
        }