import numpy as np


class MultiResponse:
    def __init__(self, detected):
        self.detected = [elem.__dict__ for elem in detected]


class Projections:
    def __init__(self, user, members):
        self.user = user.tolist()
        self.members = members.tolist()


class DetectedResponse:
    def __init__(self, base64image, face_positions, name):
        self.positions = face_positions
        self.face = base64image
        self.name = name


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

        from sklearn.decomposition import PCA
        self.pca = PCA(n_components=2)
        self.pca.fit(self.as_matrix)

    def __len__(self):
        return len(self.cache)

    def find(self, representation, top):
        all_differences = self.as_matrix - representation
        l2_distances = np.sum(all_differences ** 2, 1)

        return [self.cache[i] for i in np.argsort(l2_distances)[0:top]]

    def pca_projections(self, representation, top):
        closest = self.find(representation, top)
        member_projections = self.pca.transform([m.representation for m in closest])
        user_projection = self.pca.transform([representation])

        return user_projection[0], member_projections

