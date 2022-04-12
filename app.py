# from unicodedata import name
from flask import Flask, Response, render_template,jsonify
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
    db = mongo.EV_db
    mongo.server_info() # trigger exception if cannot connet to db
except:
    print ("ERROR - Cannot connect to db")
data1 = []

##############################
@app.route("/greenlots_stations_us", methods=["GET"])
def get_greenlots():
    try:
        data = list(db.greenlots_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return Response(
            response = (data),
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
            response = (data),
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
@app.route("/flo_stations_us", methods=["GET"])
def get_flo():
    try:
        data = list(db.flo_stations_us.find())
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
            response = json.dumps({"message":"cannot read flo"}),
            status = 500,
            mimetype = "application/json"
        )
##############################
@app.route("/API/greenlots_stations_us_web")
def get_greenlots_web():
    # try:
        data = list(db.greenlots_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return jsonify(data)
    #         response = (data),
    #         status = 200,
    #         mimetype = "application/json"
    #     )
    # except Exception as ex:
    #     print(ex)
    #     return Response(
    #         response = json.dumps({"message":"cannot read greenlots"}),
    #         status = 500,
    #         mimetype = "application/json"
    #     )
##############################

##############################
@app.route("/API/tesla_stations_us_web")
def get_tesla_web():
    # try:
        data = list(db.tesla_stations_us.find())
        for station in data:
            station["_id"] = str(station['_id'])
        return jsonify(data)
    # except Exception as ex:
    #     print(ex)
    #     return Response(
    #         response = json.dumps({"message":"cannot read tesla"}),
    #         status = 500,
    #         mimetype = "application/json"
        # )
##############################

##############################
# @app.route("/greenlots_stations_us_web")
# def get_tesla_web():
#     # try:
#         data = list(db.greelots.find())
#         for station in data:
#             station["_id"] = str(station['_id'])
#         print("here")
        # return render_template('index.html',stations = data)
    # except Exception as ex:
    #     print(ex)
    #     return Response(
    #         response = json.dumps({"message":"cannot read tesla"}),
    #         status = 500,
    #         mimetype = "application/json"
        # )
##############################


##############################
@app.route('/')
def index():
    all_results = []
    data = list(db.tesla_stations_us.find())
    all_results.append(data)
    # data_green = list(db.greenlots.find())
    # all_results.append(data_green)
    # print(data)
    return render_template('index.html', stations=all_results)
##############################
if __name__ == "__main__":
    app.run(debug=True)