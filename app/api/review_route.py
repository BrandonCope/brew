from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)

@review_routes.route('')
def get_reviews():
    reviews = Review.query.all()
    return jsonify(
        [review.to_dict() for review in reviews]
    )

@review_routes.route('', methods=['POST'])
@login_required
def post_reviews():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review()

        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_reviews(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_review = Review.query.get(id)

        form.populate_obj(edit_review)

        db.session.add(edit_review)
        db.session.commit()

        return edit_review.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_reviews(id):
        delete_review = Review.query.get(id)
        db.session.delete(delete_review)
        db.session.commit()
        return {'message': "Success"}
