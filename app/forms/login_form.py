from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('User does not exists.')
    if not user.check_password(password):
        raise ValidationError('Credentials were incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired("Email field is required"), Email("Email must be a valid email"), user_exists])
    password = StringField('password', validators=[DataRequired("Password field is required"), password_matches])
