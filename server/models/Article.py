from __main__ import db
import datetime

class Article(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    text = db.Column(db.Text(65536), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow())

    def __init__(self, title, description, text):
        self.title = title
        self.description =  description
        self.text = text
