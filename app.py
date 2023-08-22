from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.message_routes import message
from routes.item_routes import item
from routes.index_routes import index
from config import DATABASE_URI

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

def reg_blueprint():
    app.register_blueprint(message)
    app.register_blueprint(item)
    app.register_blueprint(index)

reg_blueprint()
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(port=5500,debug=True)
