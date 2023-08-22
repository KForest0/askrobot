from sqlalchemy import Column, Integer, String, VARCHAR, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Item(Base):
    __tablename__ = 'item'

    item_id = Column(String(100), primary_key=True)
    title = Column(String(255), nullable=False)
    create_time = Column(BIGINT, nullable=False)
    update_time = Column(BIGINT, nullable=False)
    user_id = Column(BIGINT, nullable=True)
    del_flag = Column(INT, nullable=True)