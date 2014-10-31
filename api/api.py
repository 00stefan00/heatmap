import datetime
import time
from pymongo import MongoClient

timestamp = time.time()
client = MongoClient()
db = client.tvilight_production
info_bases = db.info_bases
node_bases = db.node_bases

d_start = datetime.datetime(2014, 10, 10, 0, 0)
d_end = datetime.datetime(2014, 10, 10, 0, 59)

# box = [[6.0, 52.0], [7.0, 53.0]]
box = [[0.0, 60.0], [0.0, 60.0]]

looper = 0


def getData():
	nodes = []
	nodesWithinGeo = node_bases.find(
		{"coordinates": {"$geoWithin": {"$box": box}}})

	for node in nodesWithinGeo:
		entries = info_bases.find({"_type": "Info::NodeReading", "uuid": node.get(
			"uuid"), "created_at": {"$gt": d_start, "$lt": d_end}})

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


def writeData(filename):
	f = open("data" + str(filename) + ".json", "w")
	f.write("triggers_" + str(filename) + " = " + str(getData()))
	f.close()


def makeDataFiles():
	global d_start
	global d_end
	for i in range(23):
		writeData(i)
		d_start += datetime.timedelta(hours=1)
		d_end += datetime.timedelta(hours=1)


makeDataFiles()

print str(time.time() - timestamp) + "s"
