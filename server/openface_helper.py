import cv2
import grequests
import json

from file_utils import *


class SyncHttpClient:
    def __init__(self, url):
        self.url = url

    def send_image_for_json(self, relative, image_as_np):
        _, file_name = tempfile.mkstemp(suffix=".png")
        cv2.imwrite(file_name, image_as_np)
        req = grequests.post(self.url + relative, files={"file": open(file_name, "rb")})

        return json.loads(grequests.map([req])[0].text)


class OpenfaceProxy:
    def __init__(self, http):
        self.http = http

    def all_face_positions(self, image, rotate):
        boxes = self.http.send_image_for_json("/boxes", image)

        if rotate:
            return [
                [box[1], image.shape[1] - (box[0] + box[2]), box[3], box[2]] for box in boxes
            ]
        else:
            return boxes

    def face_representation(self, image):
        return self.http.send_image_for_json("/features", image)


class OpenfaceHelper:
    def read_as_cv_image(self, base64image, rotate):
        path = save_base64_image_as_temporary(base64image)
        img = cv2.cvtColor(cv2.imread(path), cv2.COLOR_BGR2RGB)

        if rotate:
            rows, cols, _ = img.shape
            M = cv2.getRotationMatrix2D((cols / 2, rows / 2), -90, 1)
            img = cv2.warpAffine(img, M, (cols, rows))

        return img
