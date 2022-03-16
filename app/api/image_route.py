from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, Image
from app.forms import ImageForm

image_routes = Blueprint('image', __name__)

@image_routes.route('')
def get_images():
    images = Image.query.all()
    return jsonify(
        [image.to_dict() for image in images]
    )

@image_routes.route('', methods=['POST'])
@login_required
def post_images():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_image = Image()

        form.populate_obj(new_image)

        db.session.add(new_image)
        db.session.commit()

        return new_image.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# @image_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_images(id):
#     form = ImageEditForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         edit_image = Image.query.get(id)

#         form.populate_obj(edit_image)

#         db.session.add(edit_image)
#         db.session.commit()

#         return edit_image.to_dict()
#     else:
#         return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_images(id):
        delete_image = Image.query.get(id)
        db.session.delete(delete_image)
        db.session.commit()
        return {'message': "Success"}
