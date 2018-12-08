from database import Database
from file_utils import *
from models import Member
import pickle


members = Database().members_table()

with open("people.pkl", 'rb') as file:
    all = pickle.load(file)

members.insert(all)