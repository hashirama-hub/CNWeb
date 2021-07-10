from flask_mongoengine import MongoEngine
from mongoengine.fields import DateTimeField, IntField, StringField, URLField, ReferenceField
from datetime import datetime

db = MongoEngine()



class Deparment(db.Document):
    ''' Class for defining structure of reddit-top-posts collection
    '''
    name = StringField(max_length=300, required=True)
    location = StringField(max_length=300, required=True)

  

class Employee(db.Document):
    name = StringField(required=True)
    age = StringField(max_length=50)
    description = StringField(max_length=50000)
    department = ReferenceField(Deparment, dbref = False)
