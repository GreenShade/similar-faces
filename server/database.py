import psycopg2
import numpy as np
from models import Member


class Database:
    def __init__(self):
        self.connection = psycopg2.connect(dbname="faces", user="test", host="docker_db_1", password="test")

    def members_table(self):
        return MembersTable(self.connection)


class MembersTable:
    def __init__(self, connection):
        self.connection = connection

    def fetch_all(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM faces")
        for row in cursor.fetchall():
            yield Member(row[0], np.array(row[1]), row[2])

    def insert(self, members):
        cursor = self.connection.cursor()

        for member in members:
            cursor.execute("INSERT INTO faces VALUES (%(name)s, %(representation)s, %(face)s)", {
                "name": member.name,
                "representation": member.representation.tolist(),
                "face": member.face_base64
            })

        self.connection.commit()
