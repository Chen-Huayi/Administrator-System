import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import {useEffect, useState} from "react";
import {http} from "src/utils";
import {observer} from "mobx-react-lite";
import React from "react";

const { Option } = Select

function Publish(){

    const [channelList, setChannelList]=useState([])
    useEffect(() => {
        const loadList=async ()=>{
            const res = await http.get('/api/channel')
            setChannelList(res)
        }
        loadList()
    }, [])







    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Publish</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: 'This is content' }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Enter title' }]}
                    >
                        <Input placeholder="Please enter title" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Channel"
                        name="channel_id"
                        rules={[{ required: true, message: 'Choose channel' }]}
                    >
                        <Select placeholder="Please choose channel" style={{ width: 400 }}>
                            {(typeof channelList.channel_name==='undefined')?(<p>Loading...</p>):(
                                channelList.channel_name.map(
                                    (item, i)=>(<Option key={i} value={i}>{item}</Option>)
                                )
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Cover">
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>Single picture</Radio>
                                <Radio value={3}>Triple pictures</Radio>
                                <Radio value={0}>No picture</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please enter content' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="Please enter content"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                Upload
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish)
