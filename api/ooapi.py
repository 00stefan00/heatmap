import datetime
import time
from pymongo import MongoClient


class MongoCommunicator:

    def __init__(self):
        timestamp = time.time()
        client = MongoClient()
        db = client.tvilight_production
        self.info_bases = db.info_bases
        self.node_bases = db.node_bases

        self.d_start = datetime.datetime(2014, 9, 29, 0, 0)
        self.d_end = datetime.datetime(2014, 9, 29, 3, 59)

        self.box = [[6.0, 52.0], [7.0, 53.0]]

        self.looper = 0

        self.writeData("jsondata")
        # self.makeDataFiles()

    def getData(self, ):
        nodes = []
        nodesWithinGeo = self.node_bases.find(
            {"coordinates": {"$geoWithin": {"$box": self.box}}})

        for node in nodesWithinGeo:
            entries = self.info_bases.find({"_type": "Info::NodeReading", "uuid": node.get(
                "uuid"), "created_at": {"$gt": self.d_start, "$lt": self.d_end}})

            i = 0
            for entry in entries:
                if entry is not None:
                    if entry.get("pir_triggers_total") is not None:
                        i += entry.get("pir_triggers_total")

            if node is None or i is 0:
                continue

            dataobject = {
                "lat": node.get("coordinates")[0],
                "lon": node.get("coordinates")[1],
                "triggers": i
            }
            nodes.append(dataobject)

        return nodes

    def writeData(self, filename):
        f = open("data" + str(filename) + ".json", "w")
        f.write("triggers_" + str(filename) + " = " + str(self.getData()))
        f.close()

    def makeDataFiles(self):
        for i in range(6):
            self.writeData(i)
            self.d_start += datetime.timedelta(hours=4)
            self.d_end += datetime.timedelta(hours=4)


mongoComm = MongoCommunicator()
