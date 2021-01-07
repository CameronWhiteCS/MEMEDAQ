from __main__ import db

class PortfolioItem(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user = db.relationship('User')
    meme = db.relationship('Meme')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    meme_id = db.Column(db.Integer, db.ForeignKey('meme.id'))
    meme_count = db.Column(db.Integer, nullable=False, default=0)