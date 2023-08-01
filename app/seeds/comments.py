from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        content="This is a great post!", userId=1, postId=2
    )
    comment2 = Comment(
        content="wow what a fascinating topic", userId=1, postId=3,
    )
    comment3 = Comment(
        content="I loved this post I had to comment something", userId=2, postId=1
    )
    comment4 = Comment(
        content="I have never seen something so cool....!", userId=2, postId=3
    )
    comment5 = Comment(
        content="hahahahh this is awesome", userId=3, postId=1
    )
    comment6 = Comment(
        content="Great post, I love it", userId=3, postId=2
    )
    

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()