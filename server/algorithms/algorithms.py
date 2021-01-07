from __main__ import db
from models import Meme, PricePoint
from random import randint
import datetime
import random

def price_fuzz():
    memes = db.session.query(Meme).all()
    for meme in memes:
        multiplier = -1
        if randint(1, 100) >= 45:
            multiplier = 1
            
        if meme.cringe and meme.trading_price >= 500:
            multiplier = -1

        meme.trading_price += (multiplier * (1 / randint(5, 20)) * meme.trading_price)

        db.session.add(meme)
        price_point = PricePoint(meme)
        db.session.add(price_point)

    db.session.commit()

# cringe(t) = (1 - 0.0025) ^ age
# output: probability that meme continues to be non-cringe
# (exponential decay) function
def cringe_decay():
    memes = db.session.query(Meme).filter_by(cringe=False)
    curr = datetime.datetime.now()
    for meme in memes:
        create = meme.creation_date
        age = (datetime.date(curr.year, curr.month, curr.day) - datetime.date(create.year, create.month, create.day)).days
        if random.uniform(0, 1) > ((1 - 0.025) ** age):
            meme.cringe = True
            db.session.add(meme)
            print(meme.name + " is now cringe")
        
    db.session.commit()