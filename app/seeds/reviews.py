from app.models import db, Review


def seed_reviews():
    review1 = Review(
        content= "Great flavors", rating=3, user_id = 3, brewery_id = 1
    )
    review2 = Review(
        content= "Awesome hang out", rating=3, user_id = 1, brewery_id = 1
    )
    review3 = Review(
        content= "Makes shopping more enjoyable", rating=4, user_id = 3, brewery_id = 1
    )
    review4 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non.", rating=3, user_id = 3, brewery_id = 2
    )
    review5 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non.", rating=3, user_id = 1, brewery_id = 2
    )
    review6 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non.", rating=5, user_id = 3, brewery_id = 2
    )
    review7 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non.", rating=5, user_id = 2, brewery_id = 3
    )
    review8 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non.", rating=3, user_id = 1, brewery_id = 3
    )
    review9 = Review(
        content= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, dolor non pharetra feugiat, felis ante vestibulum ante, id maximus magna est et risus. Integer nunc libero, sagittis at tempor at, molestie non magna. Maecenas maximus molestie sapien, in auctor metus efficitur non. In consectetur magna justo. Donec sit amet pulvinar tellus. Maecenas bibendum ante ac laoreet facilisis. Nullam nisi erat, efficitur at tincidunt vitae, rutrum eget erat. Vivamus tincidunt, dui id imperdiet iaculis, ex massa volutpat diam, eget ultrices tellus neque quis velit.", rating=2, user_id = 2, brewery_id = 3
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
