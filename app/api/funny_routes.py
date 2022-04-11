from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Funny

funny_routes = Blueprint('funny', __name__)

@funny_routes.route('/')
def get_funny():
    funny = Funny.query.all()
    return jsonify(
        [funny.to_dict() for funny in funny]
    )

@funny_routes.route('/', methods=['POST'])
@login_required
def post_funny():
    funny = Funny()
    form_data = request.get_json()
    funny.user_id = form_data['user_id']
    funny.review_id = form_data['review_id']

    db.session.add(funny)
    db.session.commit()
    return funny.to_dict()

@funny_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_funny(id):
    delete_funny = Funny.query.get(id)

    db.session.delete(delete_funny)
    db.session.commit()
    return delete_funny.to_dict()
