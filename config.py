#先写数据库的基本配置
USERNAME = 'root'  #用户名
PASSWORD = '123456'  #数据库密码
HOST = '127.0.0.1'  #本地地址
PORT = '3306'  #端口号
DATABASE = 'chat'  #数据库名字

#连接数据库
DATABASE_URI = "mysql+mysqlconnector://{}:{}@{}:{}/{}?charset=utf8".format(
    USERNAME, PASSWORD, HOST, PORT, DATABASE)


class Config:
    SQLALCHEMY_DATABASE_URI: DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = True
