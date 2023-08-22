from flask import Blueprint,render_template

index = Blueprint('index', __name__)

@index.route('/', methods=['GET','POST'])
@index.route('/index', methods=['GET','POST'])
def getIndex():
    return render_template('chat.html')