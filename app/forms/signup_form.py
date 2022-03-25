from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Regexp, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def first_name_valid(form, field):
    first_name = form.data['first_name']
    if len(first_name) > 15:
        raise ValidationError("First Name can not exceed 15 characters")
    if first_name.isdigit():
        raise ValidationError("First Name can not contain ingtegers")

def last_name_valid(form, field):
    last_name = form.data['last_name']
    if len(last_name) > 15:
        raise ValidationError("Last Name can not exceed 15 characters")
    if last_name.isdigit():
        raise ValidationError("Last Name can not contain ingtegers")



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired("Username field is required."), username_exists])
    email = StringField('email', validators=[DataRequired("Email field is required."), Email("Email must be a valid email"), user_exists])
    first_name = StringField('first_name', validators=[DataRequired("First Name field is required."), first_name_valid])
    last_name = StringField('last_name', validators=[DataRequired("Last Name field is required."), last_name_valid])
    password = StringField('password', validators=[DataRequired("Password field is required"), Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",message="Password requires minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"), EqualTo('confirm_password',message ="Password and Confirm Password must match")])
    confirm_password = StringField('password',validators=[DataRequired("Confirm Password field is required.")])
