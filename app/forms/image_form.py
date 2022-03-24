from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError



class ImageForm(FlaskForm):
    image = StringField('Image', validators=[DataRequired("Image Required")])
    user_id = IntegerField('user_id')
    brewery_id = IntegerField('brewery_id')
