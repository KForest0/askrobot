from models.message import Question,Answer
from flask import jsonify
import json

class MessageService():

    def is_empty(json_data):
        return len(json_data) == 0
    
    def getMessages(itemId):
        from app import db

        questions = db.session.query(Question).filter(Question.item_id == itemId).order_by(Question.create_time).all()

        result = {
            "id":"",
            "title":"",
            "create_time":0,
            "update_time":0,
            "history":[]
        }

        for question in questions:
            question_data = {
                'id': question.question_id,
                'create_time': question.create_time,
                'update_time': question.update_time,
                "status": "finished_successfully",
                'message': {
                    'role': 'user',
                   'content': question.content,
                }
            }
            question_message = {question.question_id:question_data}
            result['history'].append(question_message)


            answers = db.session.query(Answer).filter(Answer.question_id==question.question_id).order_by(Answer.create_time).all()
            for answer in answers:
                answer_data = {
                    'id': answer.answer_id,
                    'create_time': answer.create_time,
                    'update_time': answer.update_time,
                    "status": "finished_successfully",
                    'message': {
                        'role':'assistant',
                        'content':answer.content
                    },
                }
                answer_message = {answer.answer_id:answer_data}
                result['history'].append(answer_message)

        first_message = list(result['history'][0].values())[0]   
        result['id'] = itemId
        result['title'] = first_message['message']['content']
        result['create_time'] = first_message['create_time']
        result['update_time'] = first_message['update_time']
        print(result)
        return result


    def insertMessage(itemId,messageArr):
        from app import db
        
        if len(messageArr) == 0: return

        questionId = None
        question = None
        answer = None

        for item in messageArr:
            data = list(item.values())[0]
            print(data)
            role = data['message']['role']
            content = data['message']['content']
            createTime = data['create_time']
            updateTime = data['update_time']
            try:
                if role == 'user':
                    questionId = data['id']
                    question = Question(question_id = data['id'],
                                    content = content,
                                    create_time = createTime,
                                    update_time=updateTime,
                                    item_id = itemId,
                                    del_flag = 0)
                    print("questio:n%s"%question)
                    db.session.add(question)
                # db.session.commit()
                else:
                    answer = Answer(answer_id = data['id'],
                                    content = content,
                                    create_time = createTime,
                                    update_time=updateTime,
                                    question_id = questionId,
                                        del_flag = 0)
                    print("questio:n%s"%question)
                    db.session.add(answer)
                    # db.session.commit()
                    db.session.commit()
            except Exception as e:
                db.session.rollback()
                print(f"Error occurred during item insertion: {str(e)}")
            finally:
                db.session.close()


    def updateMessage(answerId,content,updateTime):
        from app import db

        try:
            answer = db.session.query(Answer).filter(Answer.answer_id == answerId).first()
            if answer is not None:
                answer.content = content
                answer.update_time = updateTime
                db.session.commit()
                return {'message': 'update success'}
            else:
                return {'message': 'query no result'}

        except Exception as e:
            db.session.rollback()
            print(f"Error occurred during item insertion: {str(e)}")
            return {'message': 'error'}
        finally:
            db.session.close()
       