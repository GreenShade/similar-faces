from openface_helper import *
from file_utils import *
from models import Member
import pickle

http_client = SyncHttpClient("http://docker_openface_1:5001")
openface_proxy = OpenfaceProxy(http_client)
openface_helper = OpenfaceHelper()
image_directory = "people"

all = []


def fixed_surname(surname):
    return "-".join(x.capitalize() for x in surname.split("-"))


def to_full_name(parts):
    return " ".join(parts[1:]) + " " + parts[0]


for person in os.listdir(image_directory):
    try:
        image_path = os.path.join(image_directory, person)
        base64image = read_base64_image(image_path)

        image = openface_helper.read_as_cv_image(base64image, False)
        position = openface_proxy.all_face_positions(image, False)[0]

        representation = openface_proxy.face_representation(image)
        all.append(Member(to_full_name([fixed_surname(x.capitalize()) for x in person[:-4].split("_")]), representation, base64image))

    except Exception as e:
        print("warn: {0}".format(e))


with open("people.pkl", 'wb') as file:
    pickle.dump(all, file)
