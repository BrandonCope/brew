from datetime import datetime
from app.models import db, Image


def seed_images():


    image1 = Image(
        url = "https://images.squarespace-cdn.com/content/v1/58596817e6f2e1e1d552ae36/1506980341015-COYKPVFIJPC2701X0YJE/CR-Web-Articles-Success_Stories-LowesBrewery.jpg",
        user_id = 2,
        brewery_id = 1
    )
    image2 = Image(
        url = "https://fastly.4sqi.net/img/general/600x600/92787956_W14UjH0g80YpIiRFPp8HohT2irQ5DGKdPJGMZBw5YvM.jpg",
        user_id = 3,
        brewery_id = 1
    )
    image3 = Image(
        url = "https://colatoday.6amcity.com/wp-content/uploads/sites/5/2021/03/Lowes5Forks012-260x260.jpeg",
        user_id = 2,
        brewery_id = 1
    )
    image4 = Image(
        url = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_748,q_75,w_1000,x_1128,y_887/v1/clients/greenville/Fireforge_Crafted_Beer_3117c31b-4e40-436a-a0a3-50619ec6bd86.jpg",
        user_id = 2,
        brewery_id = 2
    )
    image5 = Image(
        url = "https://greenvillejournal.com/wp-content/uploads/2020/02/Fireforge.jpg",
        user_id = 3,
        brewery_id = 2
    )
    image6 = Image(
        url = "https://s3-media0.fl.yelpcdn.com/bphoto/NCVeEHqDUH8NceUl492kFQ/258s.jpg",
        user_id = 2,
        brewery_id = 2
    )
    image7 = Image(
        url = "https://brewery85.com/wp-content/uploads/2021/12/South-Carolina-Brewery-85-event-space-event-center-rental-reception-432x288-1.jpg",
        user_id = 3,
        brewery_id = 3
    )
    image8 = Image(
        url = "https://www.americanbuildings.com/wp-content/uploads/2018/09/brewery85c_1517500520_jpg_ff5617be0d8c16caf61e5819b8fa4b08-1000x550.jpg",
        user_id = 2,
        brewery_id = 3
    )
    image9 = Image(
        url = "https://photos.bringfido.com/attractions/2/0/6/12602/12602_23710.jpg",
        user_id = 3,
        brewery_id = 3
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
