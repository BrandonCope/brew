from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Useful

useful_routes = Blueprint('useful', __name__)

@useful_routes.route('/')
def get_useful():
    useful = Useful.query.all()
    return jsonify(
        [useful.to_dict() for useful in useful]
    )

@useful_routes.route('/', methods=['POST'])
@login_required
def post_useful():
    useful = Useful()
    form_data = request.get_json()
    useful.user_id = form_data['user_id']
    useful.review_id = form_data['review_id']

    db.session.add(useful)
    db.session.commit()
    return useful.to_dict()

@useful_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_useful(id):
    delete_useful = Useful.query.get(id)

    db.session.delete(delete_useful)
    db.session.commit()
    return delete_useful.to_dict()
