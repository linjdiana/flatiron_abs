
# Code Blooded Phase 4 Project: Flatiron_abs
=======

Brett De Bear
Diana Lin
Topher Ludlow

## Introduction
Flat & Iron Abs is a members-only gym located in the Bay Area of California, started by three software engineers who met while studying at the Flatiron School. Each of the three instructors has different teaching styles and they came together to build this website! 

## How to Navigate the Web Page
Flask backend --
cd server
pipenv install
pipenv shell
python app.py

React frontend --
npm install --prefix client
npm start --prefix client


## Deliverables
- Full CRUD actions for the Reviews class - you can GET, POST, PATCH and DELETE reviews. 
- Creating Databases using Flask SQLAlchemy models and creating relationships by using serializing rules. 
- Four forms created using Formik -- a post reviews form, log in form, sign up for a username & password form, and a "sign up for classes" form
- Validations in models file
- Routes: /trainers goes to trainer bios, /workouts goes to the list of workouts the gym provides, /reviews goes to the page with crowdsourced reviews along with the reviews form, /authentication is the initial page where a prospect can sign up for a new account or existing customer can log in
- Web page is deployed using Render

## Models and Relationships
- User: once a user signs up, their information gets saved so they can log in in the future. User passwords are hashed using Bcrypt.
- Trainer: each trainer is associated with a workout; we pulled images for the trainers online and wrote each other's bios.
- Workout: Associated with a trainer and multiple reviews 
- Review: each is associated with a workout 
- Signup: functions like an "add to cart"; users are able to sign up for a workout class 

## Seed Data
We gathered the reviews from members of our West Coast Software Engineering Cohort "Code Blooded". We're incredibly grateful for the great friends we've made along the way and even more grateful for the honest reviews about Topher. 

## Features
You are unable to access the calendar and reviews unless you sign up for an account and log in. This is due to the high demand of the classes taught by the trio.

Once you log in, you'll have access to a bio of each of the trainers, their training calendars, and if it's your first time going to Flat & Iron Abs Gym, you can check out their reviews page! Once you've taken a class, you would be able to add a review of your own. In the "sign ups" bar, you can see the classes that you have signed up for. 
