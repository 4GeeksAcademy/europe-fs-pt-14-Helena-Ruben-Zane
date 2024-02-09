"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from functools import wraps
import json
import resource
from flask import Flask, request, jsonify, url_for, Blueprint, abort
import jwt
from api.models import db, User, UserData, Event
from api.utils import   admin_required, get_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask import current_app
import os
import stripe

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe.api_version = "2022-08-01"

#update the keys in .en file when a new codespaces is cretaed
#STRIPE_SECRET_KEY=
#STRIPE_PUBLISHABLE_KEY=



 
api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    email = request.json.get("email")
    username = request.json.get("username")
    password = request.json.get("password")
    secure_password = get_hash(
        password)
    
    new_user = User()
    new_user.email = email
    new_user.username = username
    new_user.password = secure_password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201


@api.route('/login', methods=['POST'])
def login_user():
  
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    found_user = User.query.filter_by(email=email, password=get_hash(password)).one_or_none()
    if found_user is None:
        return "email or password incorrect", 400
    token = create_access_token(identity={'email': email} )
    return jsonify(token=token)

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
   
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/get-hash", methods=["POST"])
def handle_get_hash():
    to_hash = request.json.get("string")
    return get_hash(to_hash)

@api.route('/users', methods=['GET'])
def handle_get_users():
   all_users = User.query.all()
   all_users = [{
   "id": user.id,
   "username": user.username,
   "email": user.email,
   "level": user.level,
   "stripe_link_integration": user.stripe_link_integration
} for user in all_users]

   if not all_users:
       return jsonify({"msg": "There are no users"}), 404

   response_body = {
       "results": all_users
   }

   return jsonify(response_body), 200

@api.route('/users', methods=['DELETE'])
def delete_all_users():
        all_users = User.query.all()
        for user in all_users:
            db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "All users have been deleted."}), 200
   

@api.route('/config', methods=['GET'])
def get_config():
    return jsonify({
        'publishableKey': os.getenv('STRIPE_PUBLISHABLE_KEY'),
    })

from flask import request

@api.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data.get('amount')  

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='eur',
            automatic_payment_methods={
                'enabled': True
            }
        )

        return jsonify({"client_secret": payment_intent.client_secret})
    except Exception as e:
        current_app.logger.error(str(e))
        return jsonify({}),  400


@api.route ("/userdata/", methods=["POST"]) 
@jwt_required()
def handle_userdata():

    data = request.json 

    date_time = data.get("date_time", None)
    location = data.get("location", None)
    liters = data.get("liters", None)

    arr = ["date_time", "location", "liters"]
    if any(item not in data for item in arr):
        return jsonify({"error": "All data is required"}), 400

    current_user_id = get_jwt_identity()  
    new_data = UserData(user_id=current_user_id, date_time=date_time, location=location, liters=liters)

    try:
        db.session.add(new_data)
        db.session.commit()
        return jsonify({"message":"Your data is succesfully updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()


@api.route('/admin', methods=['PUT'])
def promote_user():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        user.level = 2
        db.session.commit()
        return {'message': 'User promoted successfully'}, 200
    else:
        return {'error': 'No user found with the provided email'}, 404
    

@api.route("/event", methods=["POST"])
def create_event():
    day = request.json.get("day")
    hour = request.json.get("hour")
    location = request.json.get("location")
    meeting_point = request.json.get("meeting_point")
    
    new_event = Event()
    new_event.day = day
    new_event.hour = hour
    new_event.location = location
    new_event.meeting_point = meeting_point
    db.session.add(new_event)
    db.session.commit()

    return jsonify({"msg": "Event created"}), 201

@api.route('/events', methods=['GET'])
def get_event():
    event = Event.query.order_by(Event.id.desc()).first()
    if event is None:
        return jsonify({"message": "No events found"}), 404
    return jsonify(event.serialize())

@api.route('/events', methods=['DELETE'])
def delete_all_events():
    events = Event.query.all()
    for event in events:
        db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "All events were successfully deleted."})

@api.route("/clickupdate", methods=["PUT"])
def UpdateClicksCounter():
    event = Event.query.order_by(Event.id.desc()).first()
    if event is None:
        return {"message": "No events found"}, 404


    checkbox_state = request.json.get('checkbox_state')

    if checkbox_state == 'on':

        event.clicks_counter += 1
    elif checkbox_state == 'off':
   
        event.clicks_counter = max(0, event.clicks_counter - 1)

    db.session.add(event)
    db.session.commit()

    return jsonify ({"message": "Clicks counter updated successfully"}), 200

@api.route("/clicks", methods=["GET"])
def UShowClicksCounter():
    event = Event.query.order_by(Event.id.desc()).first()
    return jsonify(event.clicks_counter)
     
@api.route('/userslevel', methods=['GET'])
@jwt_required()
def handle_get_user_level():
    try:
       
        jwt_data = get_jwt_identity()
        email = jwt_data.get('email') 

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({"level": user.level}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    

@api.route('/stripelink', methods=['PUT'])
def stripe_link_integration():
    data = request.get_json()
    email = data.get('email')
    stripe_link_integration = data.get('stripe_link_integration')  
    user = User.query.filter_by(email=email).first()
    if user:   
        user.stripe_link_integration = stripe_link_integration       
        db.session.commit()
        return jsonify({"message": "Stripe link integration updated successfully"}),  200
    else:
       
        return jsonify({"error": "User not found"}),  404

@api.route('/usersstripelink', methods=['GET'])
@jwt_required()
def handle_get_stripe_kink():
    try:
       
        jwt_data = get_jwt_identity()
        email = jwt_data.get('email') 

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({"stripe_link_integration": user.stripe_link_integration}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500