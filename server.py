# from unicodedata import name
from flask import Flask, Response, request
import pymongo
import json
from bson.objectid import ObjectId
app = Flask(__name__)
try:
    mongo = pymongo.MongoClient(
        host ="localhost",
        port = 27017,
        serverSelectionTimeoutMS = 1000
    )
    db = mongo.company
    mongo.server_info() # trigger exception if cannot connet to db
except:
    print ("ERROR - Cannot connect to db")

##############################
@app.route("/greenlots_stations_us", methods=["GET"])
def get_greenlots():
    try:
        data = list(db.greenlots_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return Response(
            response = json.dumps(data),
            status = 200,
            mimetype = "application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({"message":"cannot read greenlots"}),
            status = 500,
            mimetype = "application/json"
        )
##############################
@app.route("/volta_stations_us", methods=["GET"])
def get_volta():
    try:
        data = list(db.volta_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return Response(
            response = json.dumps(data),
            status = 200,
            mimetype = "application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({"message":"cannot read volta"}),
            status = 500,
            mimetype = "application/json"
        )
##############################
@app.route("/tesla_stations_us", methods=["GET"])
def get_tesla():
    try:
        data = list(db.tesla_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return Response(
            response = json.dumps(data),
            status = 200,
            mimetype = "application/json"
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({"message":"cannot read tesla"}),
            status = 500,
            mimetype = "application/json"
        )
##############################
if __name__ == "__main__":
    app.run(port =80, debug=True)