from cmath import log
from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Cool

cool_routes = Blueprint('cool', __name__)

@cool_routes.route('/')
def get_cool():
    cool = Cool.query.all()
    return jsonify(
        [cool.to_dict() for cool in cool]
    )

@cool_routes.route('/', methods=['POST'])
@login_required
def post_cool():
    cool = Cool()
    form_data = request.get_json()
    cool.user_id = form_data['user_id']
    cool.review_id = form_data['review_id']

    db.session.add(cool)
    db.session.commit()
    return cool.to_dict()

@cool_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cool(id):
    delete_cool = Cool.query.get(id)

    db.session.delete(delete_cool)
    db.session.commit()
    return delete_cool.to_dict()
