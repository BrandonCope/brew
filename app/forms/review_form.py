from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError



class ReviewForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    user_id = IntegerField('user_id')
    brewery_id = IntegerField('brewery_id')
