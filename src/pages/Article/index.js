import {Link, useNavigate} from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/en_US'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from 'src/assets/5.jpg'
import React, {useEffect, useState} from "react";
import {http} from "src/utils";

const { Option } = Select
const { RangePicker } = DatePicker

function Article () {
    const [channelList, setChannelList]=useState([])
    useEffect(()=>{
        fetch('/api/channel')
            .then(res=>res.json())
            .then(data=>{
                    setChannelList(data)
                }
            )
    }, [])

    const [articleList, setArticleList]=useState({
        list: [],
        count: 0
    })
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })

    const onFinish=(values)=>{
        console.log(values)

        const {id , date, status}=values
        const parameter={}
        if (status!==-1){
            parameter.status = status
        }
        if (id){
            parameter.id = id
        }
        if (date) {
            parameter.begin_pubdate = date[0].format('YYYY-MM-DD')
            parameter.end_pubdate = date[1].format('YYYY-MM-DD')
        }

        setParams({
            ...params, ...parameter
        })
    }


    useEffect(() => {
        const loadList=async ()=>{
            const res = await http.get('/mp/articles', { params })
            const { results, total_count } = res.data
            setArticleList({
                list: results,
                count: total_count
            })
        }
        loadList()
    }, [params])



    const [backendData, setBackendData]=useState([])
    useEffect(()=>{
        fetch('/api/article', {params})
            .then(res=>res.json())
            .then(data=>{
                setBackendData(data)
                console.log(data)

                // const { results, total_count } = data
                // setBackendData({
                //     list: results,
                //     count: total_count
                // })

            })
    }, [params])
    const data1 = [backendData]

    const pageChange=(page)=>{
        setParams({
            ...params, page
        })
    }

    const navigate=useNavigate()
    const publishArticle=(data)=>{
        navigate(`/publish?id=${data.id}`)
    }

    const deleteArticle=async (data)=>{
        await http.delete(`/mp/articles/${data.id}`)
        // delete(`/api/article/${data.id}`)
        setParams({
            ...params,
            page: 1
        })
    }

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'cover',
            width:120,
            render: cover => {
                return <img src={cover || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: 220
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: 'Publish Date',
            dataIndex: 'pubdate'
        },
        {
            title: 'View',
            dataIndex: 'read_count'
        },
        {
            title: 'Comment',
            dataIndex: 'comment_count'
        },
        {
            title: 'Like',
            dataIndex: 'like_count'
        },
        {
            title: 'Operation',
            render: data => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={()=>publishArticle(data)}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={()=>deleteArticle(data)}
                        />
                    </Space>
                )
            }
        }
    ]

    /*const data = [
        {
            'id': '1111',
            'comment_count': 0,
            'cover': 'src/assets/4.jpg',
            'like_count': 0,
            'pubdate': '2022-03-11 09:00:00',
            'read_count': 2,
            'status': 2,
            'title': 'wkwebview离线化加载h5资源解决方案'
        },
        {
            'id': '2222',
            'comment_count': 0,
            'cover': {
                'images':['http://geek.itheima.net/resources/images/15.jpg'],
            },
            'like_count': 0,
            'pubdate': '2022-03-11 09:00:00',
            'read_count': 2,
            'status': 2,
            'title': 'wkwebview离线化加载h5资源解决方案'
        },
    ]*/




    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Content Manager</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: null }}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value={null}>All</Radio>
                            <Radio value={0}>Draft</Radio>
                            <Radio value={1}>To audit</Radio>
                            <Radio value={2}>Pass Audit</Radio>
                            <Radio value={3}>Failure Audit</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Channel" name="channel_id">
                        <Select
                            placeholder="Please select channel"
                            style={{ width: 120 }}
                        >
                            {(typeof channelList.channel_name==='undefined')?(<p>Loading...</p>):(
                                channelList.channel_name.map(
                                    (channel, i)=>(<Option key={i} value={i}>{channel}</Option>)
                                )
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            Filter
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`${articleList.count} results after selecting:`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={articleList.list}
                    // dataSource={data1}
                    pagination={{
                        pageSize: params.per_page,
                        total: articleList.count,
                        onChange: pageChange
                    }}

                />
            </Card>
        </div>
    )
}

export default Article
