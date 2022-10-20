import {Button, Form, Input, message, Select} from 'antd';
import React, {useEffect, useRef} from 'react';
import {Option} from "antd/es/mentions";
import './update-profile.scss'
import {useStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {http} from "../../utils";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 9,
    },
};

const UserInfo = () => {
    const {updateStore}=useStore()
    const navigate=useNavigate()
    const form=useRef(null)

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    )

    const onFinished = async (values) => {
        await updateStore.updateUserInfo(values)
        const updateInfo = updateStore.updateForm

        if (updateInfo.status!==1){
            navigate('/')
            window.location.reload()
            message.success(updateInfo.message)
        }else {
            message.error(updateInfo.message)
        }
    }

    const onFinishedFailed = (err) =>{
        console.log('Failed: ', err)
    }

    useEffect(()=>{
        const loadDetail=async ()=>{
            const res=await http.get('/api/profile')

            form.current.setFieldsValue({
                username: res.name,
                email: res.email,
                prefix: res.prefix,
                phone: res.phone,
                gender: res.gender
            })
        }
        loadDetail()
    }, [])

    return (
        <div className="update-userinfo">
            <div className="update-userinfo-header">
                Update Your Information
            </div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinished}
                onFinishFailed={onFinishedFailed}
                ref={form}
                initialValues={{
                    prefix: '1',
                }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" shape="round" size="large">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserInfo;
