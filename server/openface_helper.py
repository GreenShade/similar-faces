import openface
import dlib
import cv2

from file_utils import *


class OpenfaceHelper:
    def __init__(self, model_dir):
        self.dim = 96
        self.face_net = self.net = openface.TorchNeuralNet(os.path.join(model_dir, "nn4.small2.v1.t7"), self.dim)
        self.align = openface.AlignDlib(os.path.join(model_dir, "shape_predictor_68_face_landmarks.dat"))

    def read_as_cv_image(self, base64image):
        path = save_base64_image_as_temporary(base64image)
        return cv2.cvtColor(cv2.imread(path), cv2.COLOR_BGR2RGB)

    def all_face_positions(self, image):
        return [
            [box.left(), box.top(), box.width(), box.height()]
            for box in self.align.getAllFaceBoundingBoxes(image)
        ]

    def face_representation(self, image, face_position):
        bounding_box = dlib.rectangle(left=face_position[0],
                                      top=face_position[1],
                                      right=face_position[0] + face_position[2],
                                      bottom=face_position[1] + face_position[3])
        aligned_image = self.align.align(self.dim, image, bounding_box, landmarkIndices=openface.AlignDlib.OUTER_EYES_AND_NOSE)
        return self.face_net.forward(aligned_image)