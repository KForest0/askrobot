from flask import Flask, render_template, request, jsonify, Blueprint
from services.message_service import MessageService

message = Blueprint('msg', __name__)

# Message API
@message.route('/message/get', methods=['post'])
def getMessage():
    data = request.get_json()
    responseData = MessageService.getMessages(data)
    return jsonify(responseData)


@message.route('/message/add', methods=['post'])
def insertMessage():
    # 解析请求的 JSON 数据
    data = request.get_json()
    itemId = None
    messageArr = None
    for key, value in data.items():
        itemId = key
        messageArr = value
    
    MessageService.insertMessage(itemId,messageArr)
    return {}


@message.route('/message/remove', methods=['post'])
def removeMessage():
    # 解析请求的 JSON 数据
    data = request.get_json()
    titleId = data['targetId']
    messageId = data['messageId']

    if messageId == '':
        print('删除当前titleId下的所有信息')
    else:
        print('删除指定Id下的信息')
        print(data)
    return {}


@message.route('/message/update', methods=['post'])
def updateMessage():
    data = request.get_json()

    answerId = data['answerId']
    content = data['history']['content']
    updateTime = data['updateTime']
    print(updateTime)
    
    return MessageService.updateMessage(answerId,content,updateTime)

