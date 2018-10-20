import json
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from exceptions import EmptyImage
from models import *
from openface_helper import OpenfaceHelper
from database import Database
from file_utils import read_base64_image

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
    representation = opencv_helper.face_representation(image, face_position)

    # todo: idea for a hack unless we prevent flickering
    # closest_user = users.find(representation)

    # if closest_user is not None:
    #     return closest_user.cached_face
    # else:
    #     return members.find(representation).face

    return members.find(representation).face_base64


@socketio.on("detect")
def detect_face_io(image):
    try:
        image = validate_base64_image(image)
        image_data = opencv_helper.read_as_cv_image(image)
        face_positions = find_face_positions(image_data)

        if len(face_positions) == 1:
            face = detect_face(image_data, face_positions[0])
            respond(DetectedResponse(face, face_positions))
        else:
            respond(DetectedResponse(unknown_face, face_positions))
    except EmptyImage:
        respond(DetectedResponse(unknown_face, []))
