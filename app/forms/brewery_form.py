from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def isZip(form, field):
    zip_code = field.data
    if len(zip_code) != 5:
        raise ValidationError('Zipcode must be 5 digits')
    if not zip_code.isdigit():
        raise ValidationError('Zip code must be an integer')




class BreweryForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired(), isZip])
    phone = StringField('phone', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email("Email must be a valid email")])
    host_id = IntegerField('user_id')
