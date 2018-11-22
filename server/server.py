import json
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from exceptions import EmptyImage
from models import *
from openface_helper import OpenfaceHelper
from database import Database
from file_utils import read_base64_image
import pickle
import numpy as np
import time

unknown_face = read_base64_image("unknown.jpg")

print("creating services...")
opencv_helper = OpenfaceHelper("model")
database = Database()
members = Members(database.members_table())

print("starting server...")
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

print("server ready!")


def validate_base64_image(image):
    image = image.strip().replace(" ", "+")

    if not image:
        raise EmptyImage
    return image


def respond(result):
    emit("face", json.dumps(result.__dict__))


def find_face_positions(image):
    return opencv_helper.all_face_positions(image)


def detect_face(image, face_position):
    
    time_between_reset = 2

    representation = opencv_helper.face_representation(image, face_position)

    # avg_image = [representation, 1.0, 'dupa']
    # with open("avg_image", 'wb') as file:
    #     pickle.dump(avg_image, file)

    # with open("avg_image", 'rb') as file:
    #     avg_image = pickle.load(file)

    # avg_image[1] += 1.0
    # with open("avg_image", 'wb') as file:
    #     pickle.dump(avg_image, file)

    try:
        with open("avg_image", 'rb') as file:
            avg_image = pickle.load(file)
        if time.time() - avg_image[2] < time_between_reset:
            avg_image[2] = time.time()
            avg_image[1] += 1.0
            avg_image[0] = avg_image[0] * ((avg_image[1] - 1) / avg_image[1]) + representation * 1/avg_image[1]
        else:
            avg_image = [representation, 1.0, time.time()]
    except:
        avg_image = [representation, 1.0, time.time()]


    with open("avg_image", 'wb') as file:
        pickle.dump(avg_image, file)
    
    with open("avg_image_text", 'w') as file:
        file.write(str(avg_image))

    # todo: idea for a hack unless we prevent flickering
    # closest_user = users.find(representation)

    # if closest_user is not None:
    #     return closest_user.cached_face
    # else:
    #     return members.find(representation).face
    # return members.find(representation).face_base64

    return members.find(avg_image[0])


@socketio.on("detect")
def detect_face_io(image):
    try:
        image = validate_base64_image(image)
        image_data = opencv_helper.read_as_cv_image(image)

        face_positions = find_face_positions(image_data)

        if len(face_positions) == 1:
            member = detect_face(image_data, face_positions[0])
            face = member.face_base64
            name = member.name

            respond(DetectedResponse(face, face_positions, name))
        else:
            respond(DetectedResponse(unknown_face, face_positions, "Not recognized"))
    except EmptyImage:
        respond(DetectedResponse(unknown_face, [], "Not recognized"))
