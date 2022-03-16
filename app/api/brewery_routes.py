from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Brewery
from app.forms import BreweryForm, BreweryEditForm

brewery_routes = Blueprint('brewery', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages

@brewery_routes.route('/')
def get_breweries():
    breweries = Brewery.query.all()
    return jsonify(
        [brewery.to_dict() for brewery in breweries]
    )

@brewery_routes.route('/', methods=['POST'])
@login_required
def post_breweries():
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_brewery = Brewery()

        form.populate_obj(new_brewery)

        db.session.add(new_brewery)
        db.session.commit()

        return new_brewery.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@brewery_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_breweries(id):
    form = BreweryEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_brewery = Brewery.query.get(id)

        form.populate_obj(edit_brewery)

        db.session.add(edit_brewery)
        db.session.commit()

        return edit_brewery.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@brewery_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_breweries(id):
        delete_brewery = Brewery.query.get(id)
        db.session.delete(delete_brewery)
        db.session.commit()
        return {'message': "Success"}
