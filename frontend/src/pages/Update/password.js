import {Button, Card, Form, Input, InputNumber, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {useStore} from "store";
import {useNavigate} from "react-router-dom";
import './password.scss'

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 7,
    },
}


const ChangePassword = () => {
    const {updateStore}=useStore()
    const navigate=useNavigate()
    const [form] = Form.useForm();

    const onFinished = async (values) => {
        await updateStore.updatePassword(values)
        const updatePwd = updateStore.updateForm

        if (updatePwd.status!==1){
            navigate('/')
            message.success(`Reset password successfully!`)
        }else {
            form.resetFields();
            message.error(updatePwd.message)
        }
    }

    const onFinishedFailed = (err) =>{
        console.log('Failed: ', err)
    }

    return (
        <div className="update-password">
            <div className="update-password-header">
                Update Your Password
            </div>
            <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinished}
                onFinishFailed={onFinishedFailed}
            >
                <Form.Item
                    name="old_password"
                    label="Old Password"
                    rules={[
                        {
                            min: 6,
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        {
                            min: 6,
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm New Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
                    <Button type="primary" htmlType="submit" size="large" shape="round">
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword;
