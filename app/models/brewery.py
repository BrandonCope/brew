from app.models.db import db
from sqlalchemy import ForeignKey

class Brewery(db.Model):
    __tablename__='breweries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="breweries")
    images = db.relationship('Image', back_populates='breweries', cascade = "all, delete-orphan")
    reviews = db.relationship('Review', back_populates='breweries', cascade = "all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'phone': self.phone,
            'email': self.email,
            'host_id': self.host_id,
            'images': [{'id':image.id,'url':image.url} for image in self.images],
            'rating': [review.rating for review in self.reviews]
        }
