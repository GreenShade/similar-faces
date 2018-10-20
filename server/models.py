import numpy as np


class DetectedResponse:
    def __init__(self, base64image, face_positions):
        self.positions = face_positions
        self.face = base64image


class Member:
    def __init__(self, name, representation, face_base64):
        self.name = name
        self.representation = representation
        self.face_base64 = face_base64


class Members:
    def __init__(self, members_table):
        self.members_table = members_table
        self.cache = []
        for member in members_table.fetch_all():
            self.cache.append(member)
        self.as_matrix = np.array([member.representation for member in self.cache])

    def find(self, representation):
        all_differences = self.as_matrix - representation
        l2_distances = np.sum(all_differences ** 2, 1)

        return self.cache[np.argmin(l2_distances)]