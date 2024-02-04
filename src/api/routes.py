"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from functools import wraps
from xml.dom import UserDataHandler
from flask import Flask, request, jsonify, url_for, Blueprint, abort
import jwt
from api.models import db, User, UserData
from api.utils import   admin_required, get_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import os
import stripe 
from datetime import datetime 

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe.api_version = "2022-08-01"



 
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
    token = create_access_token(identity={'email': email, 'level': found_user.level})
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
       "email": user.email
   } for user in all_users]

   if not all_users:
       return jsonify({"msg": "There are no users"}), 404

   response_body = {
       "results": all_users
   }

   return jsonify(response_body), 200

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
        app.logger.error(str(e))
        return jsonify({}), 400


@api.route ("/userdata", methods=["POST"]) 
@jwt_required()
def handle_userdata():

    data = request.json
    
    start_time = data.get("start_time", None)
    finish_time = data.get ("finish_time", None)
    status = data.get ("status", None)
    location = data.get("location", None)
    liters = data.get("liters", None)

    user_token_info = get_jwt_identity()
    email = user_token_info["email"] 
    user= User.query.filter_by(email=email).first()

    try:
        new_data = UserData(user_id=user.id, start_time=start_time, finish_time=finish_time or None, status=status if finish_time else "pending", location=location if location else None, liters=liters if liters else None)
        db.session.add(new_data)
        db.session.commit()
        return jsonify({"message":"Your data is succesfully created", "userdata_id": new_data.id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()

@api.route ("/userdata/<int:id>", methods=["PUT"]) 
@jwt_required()
def update_userdata(id):

    data = request.json
    
    finish_time = data.get ("finish_time", None)
    location = data.get("location", None)
    liters = data.get("liters", None)

    user_token_info = get_jwt_identity()
    email = user_token_info["email"] 
    
    try:
        current = UserData.query.get(id)
        if current : 
            current.finish_time = finish_time if finish_time else None
            current.status = "completed"
            current.location = location if location else None
            current.liters = liters if liters else None
            db.session.commit()
            return jsonify({"message":"Your data is succesfully updated"}), 200
        else:
            return jsonify ({"message": "No userdata for this id"}), 404
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        db.session.close()
    

@api.route ("/userdata/getimpact", methods=['GET'])
@jwt_required()
def getimpact_userdata():

    data = request.json

    user_token_info = get_jwt_identity()
    email = user_token_info["email"] 
    user= User.query.filter_by(email=email).first()

    start_time = data.get ("start_time", None)
    finish_time = data.get ("finish_time", None)
    liters = data.get("liters", None)

    start_time = datetime.strptime(start_time, "%Y-%m-%dT%H:%M:%S") 
    finish_time = datetime.strptime(finish_time, "%Y-%m-%dT%H:%M:%S")

    try: 
        user_data_entries = UserData.query.filter_by(user_id=user.id, start_time=start_time, finish_time=finish_time or None, liters=liters if liters else None).all()
    
        if not user_data_entries:
            return jsonify({"message": "No data available"}), 404
        else: 
            total_time = str((entry.finish_time - entry.start_time) for entry in user_data_entries)
            total_liters = sum(entry.liters for entry in user_data_entries)
            average_time = sum (total_time) / len(user_data_entries) if user_data_entries else 0
            average_liters = total_liters / len(user_data_entries) if user_data_entries else 0

        return jsonify({
            "message": "Your Sandsmile impact processed successfully",
            "total_time": total_time,
            "total_liters": total_liters,
            "average_time": average_time,
            "average_liters": average_liters
        }), 200
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

