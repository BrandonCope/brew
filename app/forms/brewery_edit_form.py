from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def isZip(form, field):
    zip_code = field.data
    if len(zip_code) != 5:
        raise ValidationError('Zipcode must be 5 digits')
    if not zip_code.isdigit():
        raise ValidationError('Zip code must be an integer')

states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC","DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA","MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE","NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC","SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

def isState(form, field):
    state = form.data['state']
    if state not in states:
        raise ValidationError('Please select a provided State')

    # if len(state) != 2:
    #     raise ValidationError('State must be a 2 character abbr.')

def isPhone(form,field):
    phone = form.data['phone']
    if len(phone) != 14:
        raise ValidationError('Phone number must be 10 digits')




class BreweryEditForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired(), isState])
    zip_code = StringField('zip_code', validators=[DataRequired(), isZip])
    phone = StringField('phone', validators=[DataRequired(), isPhone])
    email = StringField('email', validators=[DataRequired(), Email("Email must be a valid email")])
