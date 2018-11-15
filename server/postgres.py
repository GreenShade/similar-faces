from database import Database
from openface_helper import OpenfaceHelper
from file_utils import *
from models import Member

members = Database().members_table()
openface_helper = OpenfaceHelper("model")
image_directory = "people"

all = []
for person in os.listdir(image_directory):
    try:
        image_path = os.path.join(image_directory, person)
        base64image = read_base64_image(image_path)

        image = openface_helper.read_as_cv_image(base64image)
        position = openface_helper.all_face_positions(image)[0]

        representation = openface_helper.face_representation(image, position)
        all.append(Member(person[:-4], representation, base64image))

    except Exception as e:
        print("warn: {0}".format(e))

members.insert(all)
