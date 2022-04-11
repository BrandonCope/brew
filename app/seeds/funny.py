from app.models import db,Funny

def seed_funny():
    funny1 = Funny(
        user_id = 1, review_id = 1
    )
    funny2 = Funny(
        user_id = 1, review_id = 2
    )
    funny3 = Funny(
        user_id = 1, review_id = 3
    )
    funny4 = Funny(
        user_id = 2, review_id = 1
    )
    funny5 = Funny(
        user_id = 2, review_id = 2
    )
    funny6 = Funny(
        user_id = 2, review_id = 3
    )
    funny7 = Funny(
        user_id = 3, review_id = 1
    )
    funny8 = Funny(
        user_id = 3, review_id = 2
    )
    funny9 = Funny(
        user_id = 3, review_id = 3
    )

    db.session.add(funny1)
    db.session.add(funny2)
    db.session.add(funny3)
    db.session.add(funny4)
    db.session.add(funny5)
    db.session.add(funny6)
    db.session.add(funny7)
    db.session.add(funny8)
    db.session.add(funny9)
    db.session.commit()

def undo_funny():
    db.session.execute('TRUNCATE funny RESTART IDENTITY CASCADE;')
    db.session.commit()
