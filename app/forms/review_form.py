from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError

def content_valid(form, field):
    content = form.data['content']
    if len(content) < 15:
        raise ValidationError("Reviews require at least 15 characters.")
    if len(content) > 2000:
        raise ValidationError("Reviews can not exceed 2000 characters.")



class ReviewForm(FlaskForm):
    content = StringField('content', validators=[DataRequired("Please write a review."), content_valid])
    rating = IntegerField('rating', validators=[DataRequired("Please select a rating.")])
    user_id = IntegerField('user_id')
    brewery_id = IntegerField('brewery_id')
