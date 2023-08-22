from sqlalchemy import Column, String, TEXT,INT, BIGINT,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Question(Base):
    __tablename__ = 'question'

    question_id = Column(String(100), primary_key=True)
    content = Column(TEXT, nullable=False)
    create_time = Column(BIGINT, nullable=False)
    update_time = Column(BIGINT, nullable=False)
    item_id = Column(String(100), nullable=True)
    del_flag = Column(INT, nullable=True)

    # answers = relationship("Answer", backref="question")

class Answer(Base):
    __tablename__ = 'answer'

    answer_id = Column(String(100), primary_key=True)
    content = Column(TEXT, nullable=False)
    create_time = Column(BIGINT, nullable=False)
    update_time = Column(BIGINT, nullable=False)
    question_id = Column(String(100), nullable=True)
    del_flag = Column(INT, nullable=True)
    # 添加一个外键来引用 Question 的主键 question_id：
    question_id = Column(String(100), ForeignKey('question.question_id'), nullable=True)