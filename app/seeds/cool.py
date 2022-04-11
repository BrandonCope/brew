from app.models import db,Cool

def seed_cool():
    cool1 = Cool(
        user_id = 1, review_id = 1
    )
    cool2 = Cool(
        user_id = 1, review_id = 2
    )
    cool3 = Cool(
        user_id = 1, review_id = 3
    )
    cool4 = Cool(
        user_id = 2, review_id = 1
    )
    cool5 = Cool(
        user_id = 2, review_id = 2
    )
    cool6 = Cool(
        user_id = 2, review_id = 3
    )
    cool7 = Cool(
        user_id = 3, review_id = 1
    )
    cool8 = Cool(
        user_id = 3, review_id = 2
    )
    cool9 = Cool(
        user_id = 3, review_id = 3
    )

    db.session.add(cool1)
    db.session.add(cool2)
    db.session.add(cool3)
    db.session.add(cool4)
    db.session.add(cool5)
    db.session.add(cool6)
    db.session.add(cool7)
    db.session.add(cool8)
    db.session.add(cool9)
    db.session.commit()

def undo_cool():
    db.session.execute('TRUNCATE cool RESTART IDENTITY CASCADE;')
    db.session.commit()
