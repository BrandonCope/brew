from app.models import db,Useful

def seed_useful():
    useful1 = Useful(
        user_id = 1, review_id = 1
    )
    useful2 = Useful(
        user_id = 1, review_id = 2
    )
    useful3 = Useful(
        user_id = 1, review_id = 3
    )
    useful4 = Useful(
        user_id = 2, review_id = 1
    )
    useful5 = Useful(
        user_id = 2, review_id = 2
    )
    useful6 = Useful(
        user_id = 2, review_id = 3
    )
    useful7 = Useful(
        user_id = 3, review_id = 1
    )
    useful8 = Useful(
        user_id = 3, review_id = 2
    )
    useful9 = Useful(
        user_id = 3, review_id = 3
    )

    db.session.add(useful1)
    db.session.add(useful2)
    db.session.add(useful3)
    db.session.add(useful4)
    db.session.add(useful5)
    db.session.add(useful6)
    db.session.add(useful7)
    db.session.add(useful8)
    db.session.add(useful9)
    db.session.commit()

def undo_useful():
    db.session.execute('TRUNCATE useful RESTART IDENTITY CASCADE;')
    db.session.commit()
