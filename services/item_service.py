from sqlalchemy import update
from models.item import Item
import json


class ItemService():

    def is_empty(json_data):
        return len(json_data) == 0

    @staticmethod
    def get_items():
        from app import db
        items = db.session.query(Item).filter(Item.user_id == 1,Item.del_flag == 0).all()

        # 将查询结果转换为字典列表
        items_dict_list = [item.__dict__ for item in items]

        # 移除字典中的无用键 '_sa_instance_state'
        for item_dict in items_dict_list:
            item_dict.pop('_sa_instance_state', None)

        # 将字典列表转换为 JSON 字符串
        items_json = json.dumps(items_dict_list)
        return items_json

    @staticmethod
    def add_item(data):
        from app import db

        if ItemService.is_empty(data): return {'message': 'data is null'}

        try:
            item = Item(item_id=data['id'],
                        title=data['title'],
                        create_time=data['create_time'],
                        update_time=data['update_time'],
                        user_id=1,
                        del_flag=0)
            db.session.add(item)
            db.session.commit()
            return {'message': 'insert success'}
        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during item insertion: {str(e)}")
            return {'message': 'insert error'}
        finally:
            db.session.close()

    @staticmethod
    def update_item(data):
        from app import db

        # if ItemService.is_empty(data): return {'message': 'data is null'}
        print('data==>%s'%data)
        itemId = data['item_id']
        title = data['title']
        update_time = data['update_time']

        try:
            item = db.session.query(Item).filter(
                Item.item_id == itemId).first()

            if item is not None:
                item.title = title
                item.update_time = update_time
                db.session.commit()
                return {'message': 'success'}
            else:
                return {'message': 'empty'}

        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during item insertion: {str(e)}")
            return {'message': 'empty'}
        finally:
            db.session.close()

    @staticmethod
    def delete_item(itemId):
        from app import db

        if itemId:
            item = db.session.query(Item).filter(Item.item_id == str(itemId)).first()
            try:
                # db.session.delete(item)
                if item is not None:
                    item.del_flag = 1
                    db.session.commit()    
            except Exception as e:
                db.session.rollback()
                print(f"Error occurred during item insertion: {str(e)}")
                return {'message': '未找到ID'}
            finally:
                db.session.close()
        else:
            return {'message': '未找到ID'}
           

    @staticmethod
    def delete_item_all():
        from app import db

        item = db.session.query(Item).filter(Item.del_flag == 0).all()

        try:
            if item is not None:
                # item.del_flag = 1

                db.session.execute(update(Item).where(Item.del_flag == 0).values(del_flag=1))
                db.session.commit()   

                return {'message': '删除成功'}
        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during item insertion: {str(e)}")
            return {'message': '删除失败'}
        finally:
            db.session.close()


