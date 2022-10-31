import pymongo

def getCol():
    mongoClient = pymongo.MongoClient('mongodb://localhost:27017')
    mongoConn=mongoClient['mongo_use']
    colName=mongoConn['stu_info']
    # 插入
    # insertDict={'name': 'lzx', 'number': '1003', 'age': 23}
    # colName.insert_one(insertDict)
    return colName

def queryAll():
    allResult=getCol().find()
    for i in allResult:
        print(i)
        # print(i.get('name'))
        # print(i.get('age'))

def one_update():
    print('更改前')
    queryAll()
    mongoCol=getCol()
    condition={'number': 19991003}
    newName={'$set': {'name': 'lzx'}}
    obj=mongoCol.update_one(condition, newName)
    print('共修改{}个文档'.format(obj.modified_count))
    queryAll()

if __name__ == '__main__':
    # one_update()
    queryAll()


    # dbList=mongoClient.list_database_names()
    # mongoCol=mongoConn['python_class']

    # insertDict={'name': 'lzx', 'number': '1003', 'age': 23}
    # result=colName.insert_one(insertDict)
    # print(result)

    # queryOne=colName.find_one()
    # print(queryOne)

    # queryAll=colName.find({}, {'_id': 0, 'name': 'lzx', 'number': 19991003})
    # queryAll=colName.find({'name': 'wyy'})
    # for item in queryAll:
    #     print(item)

    # print(mongoConn)
    # if 'mongo_use' in dbList:
    #     print(format('mongo_use'))