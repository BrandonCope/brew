from app.models.db import db
from sqlalchemy import ForeignKey

class Useful(db.Model):
    __tablename__='usefulness'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship("User", back_populates="usefulness")
    review = db.relationship("Review", back_populates="usefulness")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'review_id': self.review_id,
        }
