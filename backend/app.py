from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from models import db, Employee, Deparment
import json
import jwt 
import datetime

app = Flask(__name__)

# connect to db
app.config["MONGODB_HOST"] = "mongodb://localhost:27017/myDatabase"
app.config["SECRET_KEY"] = "thisisthesecretkey"

# app.debug = True


# initalize app with database
db.init_app(app)

CORS(app)

@app.route("/employee/", methods= ["GET","POST"])
def get_post_employee_api():
    if request.method == "GET":
        response = list()
        for employee in Employee.objects:
            response.append({ "id": str(ObjectId(employee.id)), "age": employee.age, "department": employee.department.name, "description": employee.description, "name": employee.name })
        return jsonify(response)
    if request.method == "POST":
        try:
            department = Deparment.objects.get(id=request.json["department"])
            new_employee = Employee(name=request.json["name"], age=request.json["age"], description=request.json["description"], department=department).save()
            return jsonify(new_employee)
        except:
            return jsonify({ "message": "please input full field" })

@app.route('/employee/<id>', methods=["DELETE", "PUT", "GET"])
def del_put_getdetail_of_employee_api(id):
    if request.method == "GET":
        try:
            employee = Employee.objects.get(id=id)
            return jsonify({ "id": str(ObjectId(employee.id)), "age": employee.age, "department": employee.department.name, "description": employee.description, "name": employee.name })
        except:
            return jsonify({ "message": "employee is not in db" })

    if request.method == "DELETE":
        try:
            employee = Employee.objects.get(id=id)
            employee.delete()
            return jsonify({ "message": "deleted" }) 
        except:
            return jsonify({ "message": "employee is not in db" })
    
    elif request.method == "PUT":
        try:
            employee = Employee.objects.get(id=id)
            json_data = request.json
            print(json_data)
            for data in json_data:
                if data == "department":
                    try:
                        department = Deparment.objects.get(id=json_data["department"])
                        employee["department"] = department
                    except:
                        return jsonify({ "message": "department is not in db" })
                else:
                    employee[data] = json_data[data] if json_data[data] != "" else employee[data]
            employee.save()

            return jsonify({ "message": "updated" })
        except:
            return jsonify({ "message": "employee is not in db" })

@app.route("/department/", methods= ["GET", "POST"])
def get_post_of_department_api():
    if request.method == "GET":
        # return jsonify(Post.objects)
        response = list()
        for department in Deparment.objects:
            response.append({"id":str(ObjectId(department.id)), "name":  department.name ,"location": department.location })
        return jsonify(response)
    elif request.method == "POST":
        try:
            new_department = Deparment(name=request.json["name"], location=request.json["location"]).save()
            return jsonify(new_department)
        except:
            return jsonify({ "message": "please input full field or not valid id_author" })

@app.route("/department/<id>", methods= ["PUT"])
def del_user_api(id):    
    if request.method == "PUT":
        try:
            department = Deparment.objects.get(id=id)
            json_data = request.json
            
            for data in json_data:
                department[data] = json_data[data] if json_data[data] != "" else department[data]
            department.save()

            return jsonify({ "message": "updated" })
        except:
            return jsonify({ "message": "department is not in db" })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)



