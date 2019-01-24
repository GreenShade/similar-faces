import dlib
import openface
import os
from flask import Flask, jsonify, request
import numpy as np
import cv2

model_dir = "model"
dim = 96
face_net = openface.TorchNeuralNet(os.path.join(model_dir, "nn4.small2.v1.t7"), dim)
align = openface.AlignDlib(os.path.join(model_dir, "shape_predictor_68_face_landmarks.dat"))
app = Flask(__name__)


def get_vector(face_position, image):
    bounding_box = dlib.rectangle(left=face_position[0],
                                  top=face_position[1],
                                  right=face_position[0] + face_position[2],
                                  bottom=face_position[1] + face_position[3])
    aligned_image = align.align(dim, image, bounding_box, landmarkIndices=openface.AlignDlib.OUTER_EYES_AND_NOSE)
    return face_net.forward(aligned_image)


def get_boxes(image):
    return [
        [box.left(), box.top(), box.width(), box.height()] for box in align.getAllFaceBoundingBoxes(image)
    ]


@app.route("/features", methods=["POST"])
def features():
    image = cv2.imdecode(np.fromstring(request.files["file"].read(), np.uint8), cv2.IMREAD_UNCHANGED)
    face_positions = get_boxes(image)

    return jsonify(get_vector(face_positions[0], image).tolist())


@app.route("/boxes", methods=["POST"])
def boxes():
    print(request.files)
    image = cv2.imdecode(np.fromstring(request.files["file"].read(), np.uint8), cv2.IMREAD_UNCHANGED)
    return jsonify(get_boxes(image))


@app.route("/")
def test():
    return jsonify("test")
