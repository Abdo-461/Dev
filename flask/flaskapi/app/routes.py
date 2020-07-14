#routes page to create routes to various functions 
#importing flask app and enviornemnt
from app import app , jsonify
import requests , pgdb , json 

#establish connection with flask api database
host="localhost"
dbname="flaskapi"
port=5432
conn = pgdb.connect(host = host , port = port , dbname = dbname)
cur = conn.cursor()

#route to main page when program luanched
@app.route('/')
def main():
    return "This is Flask Api"

#route to fetch all users from teh flask api database table users
@app.route('/showuser' , methods=['GET'])
def showUsers():
    cur = conn.cursor()
    cur.execute("SELECT * from users")
    data = cur.fetchall()
    return jsonify(data)

#route to show data in orders table, data coming from node api database
@app.route('/showjson' , methods=['GET'])
def showUsersJson():
    cur.execute("SELECT * from orders")
    data = cur.fetchall()
    return jsonify(data)

#this code sends a GET request to fetch data from node api database
get = requests.get("http://localhost:3030/users")
#converts the data into json format
data = get.json()
#print data on the terminal
print(data)

#this code pushes teh retrieved data from node api database into flask api database
cur.execute("INSERT INTO orders (info) VALUES ( '{0}' ) ".format(json.dumps(data)))
conn.commit()
conn.close()



