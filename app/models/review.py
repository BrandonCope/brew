from app.models.db import db
from sqlalchemy import ForeignKey

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey("breweries.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='reviews')
    breweries = db.relationship('Brewery', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'user_id': self.user_id,
            'brewery_id': self.brewery_id,
            'username': self.user.username,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
