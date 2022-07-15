import { Link } from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/en_US'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from 'src/assets/5.jpg'
import {useEffect, useState} from "react";
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

    // const data = [backendData]
    const data = [{
        'id': '8218',
        'comment_count': 0,
        'cover': {
            'images':['http://geek.itheima.net/resources/images/15.jpg'],
        },
        'like_count': 0,
        'pubdate': '2022-03-11 09:00:00',
        'read_count': 2,
        'status': 2,
        'title': 'wkwebview离线化加载h5资源解决方案'
    }]

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width:120,
            render: cover => {
                return <img src={cover || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]


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
                            defaultValue='Vue.js'
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
            <Card title={`? results after selecting：`}>
                <Table rowKey="id" columns={columns} dataSource={data} />
            </Card>

        </div>
    )
}

export default Article
