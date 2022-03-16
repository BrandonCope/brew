from datetime import datetime
from app.models import db, Brewery


# Adds a demo user, you can add other users here if you want
def seed_breweries():
    brewery1 = Brewery(
        name='The Beer Den Cavern', address='2815 Woodruff Rd', city='Simpsonville', state='SC', zip_code='29681', phone='(864)555-6842', email='beerden@aa.io', host_id=2)
    brewery2 = Brewery(
        name='The Beer Den Cavern', address='311 E Washington St', city='Greenville', state='SC', zip_code='29601', phone='(864)555-4809', email='fireforge@aa.io', host_id=2)
    brewery3 = Brewery(
        name='The Beer Den Cavern', address='6 Whitlee Ct', city='Greenville', state='SC', zip_code='29607', phone='(864)555-0104', email='brewery85@aa.io', host_id=3)

    db.session.add(brewery1)
    db.session.add(brewery2)
    db.session.add(brewery3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_breweries():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
