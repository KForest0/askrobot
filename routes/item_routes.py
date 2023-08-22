from flask import request, jsonify, Blueprint
from services.item_service import ItemService

item = Blueprint('item', __name__)


@item.route('/items/getItems', methods=['post'])
def getItemData():
    # 模拟返回数据
    results = ItemService.get_items()
    return results


@item.route('/items/updateItem', methods=['post'])
def updateItemData():
    # 解析请求的 JSON 数据
    data = request.get_json()
    print(data)
    ItemService.update_item(data)
    return {}


@item.route('/items/insertItem', methods=['post'])
def insertItemData():
    # 解析请求的 JSON 数据
    data = request.get_json()

    ItemService.add_item(data)

    return {}


@item.route('/items/deleteItem', methods=['post'])
def deleteItemData():
    data = request.get_json()
    ItemService.delete_item(data)
    return {}


@item.route('/items/deleteItemAll', methods=['post'])
def deleteItemDataAll():

    ItemService.delete_item_all()
    return {}
