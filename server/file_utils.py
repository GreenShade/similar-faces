import base64
import os
import tempfile


def read_base64_image(path):
    with open(path, "rb") as image:
        return base64.encodestring(image.read()).decode("utf-8")


def generate_temporary_path():
    return os.path.join("/tmp", next(tempfile._get_candidate_names()) + ".webp")


def save_base64_image_as_temporary(base64image):
    path = generate_temporary_path()
    with open(path, "wb") as file:
        file.write(base64.b64decode(base64image))
    return path