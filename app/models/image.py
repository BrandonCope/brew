from app.models.db import db
from sqlalchemy import ForeignKey

class Image(db.Model):
    __tablename__='images'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey("breweries.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship('User', back_populates="images")
    breweries = db.relationship('Brewery', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'brewery_id': self.brewery_id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
