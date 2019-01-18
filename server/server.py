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


def respond_pca(result):
    emit("pca", json.dumps(result.__dict__))


def find_face_positions(image, rotate):
    return opencv_helper.all_face_positions(image, rotate)


def detect_faces(image, face_position, top):
    
    time_between_reset = 2

    representation = opencv_helper.face_representation(image, face_position)

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

    return members.find(avg_image[0], top), members.pca_projections(avg_image[0], top)


@socketio.on("detect")
def detect_face_io(image, rotate):
    try:
        image = validate_base64_image(image)
        image_data = opencv_helper.read_as_cv_image(image, rotate)

        face_positions = find_face_positions(image_data, rotate)

        if len(face_positions) == 1:
            detected_members, pca_projections = detect_faces(image_data, face_positions[0], top=len(members))
            respond(MultiResponse([
                DetectedResponse(detected_members[i].face_base64, face_positions, detected_members[i].name) for i in range(3)
            ]))
            respond_pca(Projections(pca_projections[0], pca_projections[1]))
        else:
            respond(MultiResponse([
                DetectedResponse(unknown_face, face_positions, "Not recognized") for _ in range(3)
            ]))
    except EmptyImage:
        respond(MultiResponse([
            DetectedResponse(unknown_face, [], "Not recognized") for _ in range(3)
        ]))
