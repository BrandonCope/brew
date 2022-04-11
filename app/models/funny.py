from app.models.db import db
from sqlalchemy import ForeignKey

class Funny(db.Model):
    __tablename__='funny'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="funny")
    review = db.relationship("Review", back_populates="funny")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
        }
