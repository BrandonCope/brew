from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Image
from app.forms import ImageForm
from app.aws_config import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint('images', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages


@image_routes.route('/')
def get_images():
    images = Image.query.all()
    return jsonify(
        [image.to_dict() for image in images]
    )

@image_routes.route('/', methods=['POST'])
@login_required
def post_images():

    if "image" not in request.files:
        return {"errors": ["Error: Image required"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["Error: file type not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)


    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request



    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_image = Image()

        form.populate_obj(new_image)
        new_image.image=url

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
