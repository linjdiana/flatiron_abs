from faker import Faker
from app import app
from models import db, Trainer, Workout, Review, Signup, User

fake = Faker()

with app.app_context():
    Trainer.query.delete()

    trainers = []
    t1 = Trainer(name='Topher', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/chad.jpeg?raw=true', bio='Topher may look at himself in the mirror a lot, but his workouts sure will get you sweating like crazy. Depending on his mood for the day, he’ll either have you lift a partner of your choosing, or do yoga facing the mirror. You’ll usually catch him eating a bowl of mac & cheese with bacon fresh out of the oven (yes, the gym bought an oven just for him) while flexing his muscles when he thinks you’re not looking. ')
    t2 = Trainer(name='Diana', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/wonderwoman.jpg?raw=true', bio='Diana teaches a Barry’s style running class where you get yelled at to do one minute sprint intervals, followed by a 30 second break where first-timers usually leave the class after about the 6th interval. Long-time students of Diana usually spend these 30 seconds catching their breath and complaining to each other about how they’re never coming back again. ')
    t3 = Trainer(name='Brett', image='https://github.com/linjdiana/flatiron_abs/blob/topher/images/We_Can_Do_It__qhtlbj.jpg?raw=true', bio='Brett’s workouts are always early in the morning, but don’t worry! She’s always got her sweet pup Kula with her, so you’ll never dread these early mornings. She makes you do 20 push-ups for every minute you’re late, so Brett’s classes have the highest no-show rate we’ve ever seen, which is why we allow for 10 sign-ups for her classes of 5. ')
    trainers.append(t1)
    trainers.append(t2)
    trainers.append(t3)
    db.session.add_all(trainers)
    db.session.commit()
    
    workouts = []
    w1 = Workout(name='Curls', description='Gettin swoll', trainer_id=1, time="8PM")
    w2 = Workout(name='Running. But, like, A LOT', description="Diana takes you on a big, long run. When you finish, she'll decide it wasn't long enough and take you on another.", trainer_id=2, time="10AM")
    w3 = Workout(name='Spikeball. With no mercy.', description='Spikeball taken way too seriously. A full contact sport', trainer_id=3, time="7AM")
    workouts.append(w1)
    workouts.append(w2)
    workouts.append(w3)
    db.session.add_all(workouts)
    db.session.commit()

    reviews = []
    r1 = Review(user='Bianca', rating='5/5', trainer_id=3, workout_id=3, text="Brett was already an amazing trainer, but her sidekick Kula really kicked my motivation into high gear! 5/5 stars")
    reviews.append(r1)
    r2 = Review(user='Bianca', rating='5/5', trainer_id=2, workout_id=2, text="Diana Lin mixes her own workout mixes which are fire and really got my heart pumping during this workout. 5/5 stars")
    reviews.append(r2)
    r3 = Review(user='Tricia', rating='1/5', trainer_id=1, workout_id=1, text="Topher was constantly looking at himself in the mirror, which makes me feel like he doesn’t care about me and my fitness goals. That’s not to say that the workouts aren’t hard. He just insists on doing them with you. It feels like this is his workout session and I’m just there for the ride. Oh, and to grab him towels when he needs them?")
    reviews.append(r3)
    r4 = Review(user='Tricia', rating='5/5', trainer_id=2, workout_id=2, text="Diana’s workouts make me feel like I’m on x in the club. It’s great! Plus the music is always on point.")
    reviews.append(r4)
    r5 = Review(user='Bianca', rating='1/5', trainer_id=1, workout_id=1, text="Topher wouldn’t actually tell me what his actual name was — he said he was ‘Saaaaaam’, and then when I called him out on it, he changed his name to ‘Kyle’. Who even are you? 1/5 stars")
    reviews.append(r5)
    r6 = Review(user='Tricia', rating='5/5', trainer_id=3, workout_id=3, text="I enjoy training with Brett. She is so encouraging and I love when she brings her assistant Kula along. I’ve had some of the best training sessions of my life with those two!")
    reviews.append(r6)
    r7 = Review(user='Kyle', rating='5/5', trainer_id=3, workout_id=3, text="Brett did a great job emphasizing how less can actually be more, I got a quality workout done in half the time that it took for one of Tophers sessions.")
    reviews.append(r7)
    r8 = Review(user='Kyle', rating='5/5', trainer_id=2, workout_id=2, text="Diana had on fun and upbeat music the whole time that I was training, who knew working out could be so fun?")
    reviews.append(r8)
    r9 = Review(user='Kyle', rating='1/5', trainer_id=1, workout_id=1, text="During my 'workout' with Topher I felt like the little engine that couldn't. I couldn't bare any more time on that pain-train and was ecstatic as soon as it ended.")
    reviews.append(r9)
    r10 = Review(user='Sam', rating='1/5', trainer_id=1, workout_id=1, text="I recently hired Topher as a personal trainer to help me get in shape, but I think I accidentally hired a mirror instead! I mean, I’m pretty sure he spent more time admiring his own reflection than he did actually training me. And to make matters worse, I think roasting must be his love language because he kept saying mean things to me. But it was always ‘just a joke.’ Don’t get me wrong, the guy is ripped, but I’m pretty sure he loves himself more than he loves fitness. If you’re looking for a trainer who will motivate you with his own abs and a constant stream of insults, then he’s your guy. But if you want someone who will actually help you reach your fitness goals and treat you with a little respect, you might want to keep looking!")
    reviews.append(r10)
    r11 = Review(user='Terrance', rating='5/5', trainer_id=1, workout_id=1, text="Initially, I was very nervous as I have never worked with a personal trainer before, but as soon as Topher stepped through the door, every ounce of doubt in my body had dissipated, and I knew I was in good hands. Working with Topher was as natural as drinking water, with Topher’s guidance I felt a cool and collected calmness I had never felt before in my life, and to this day, I still chase that feeling.")
    reviews.append(r11)
    r12 = Review(user='Nick', rating='2/5', trainer_id=1, workout_id=1, text="Topher was constantly adjusting the lighting. To be fair, I looked great, but I wish he spent more time telling me how to improve my workout. 2 out of 5.")
    reviews.append(r12)
    db.session.add_all(reviews)
    db.session.commit()

    signups = []
    s1 = Signup(user_id=1, workout_id=1)
    signups.append(s1)
    db.session.add_all(signups)
    db.session.commit()

    users = []
    u1 = User(name='Sam', email='blah@blah.com')
    users.append(u1)
    db.session.add_all(users)
    db.session.commit()
