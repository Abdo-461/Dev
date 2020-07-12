from app import app , jsonify
import requests , pgdb , json 

host="localhost"
dbname="flaskapi"
port=5432
conn = pgdb.connect(host = host , port = port , dbname = dbname)
cur = conn.cursor()

@app.route('/')
def main():
    return "This is Flask Api"


@app.route('/')
@app.route('/showuser' , methods=['GET'])
def showUsers():
    cur = conn.cursor()
    cur.execute("SELECT * from users")
    data = cur.fetchall()
    return jsonify(data)

@app.route('/')
@app.route('/showjson' , methods=['GET'])
def showUsersJson():
    cur.execute("SELECT * from orders")
    data = cur.fetchall()
    return jsonify(data)


get = requests.get("http://localhost:3030/users")
data = get.json()
print(data)

cur.execute("INSERT INTO orders (info) VALUES ( '{0}' ) ".format(json.dumps(data)))
conn.commit()
conn.close()



