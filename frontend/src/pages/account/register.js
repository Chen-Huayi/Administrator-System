import {Button, Card, Cascader, Checkbox, Form, Input, message, Select} from 'antd'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import './register.scss'
import {useStore} from 'store';

const { Option } = Select
const residences = [
    {
        value: 'AB',
        label: 'AB',
        children: [
            {
                value: 'Edmonton',
                label: 'Edmonton',
            },
            {
                value: 'Calgary',
                label: 'Calgary',
            },
        ],
    },
    {
        value: 'BC',
        label: 'BC',
        children: [
            {
                value: 'Vancouver',
                label: 'Vancouver',
            },
            {
                value: 'Victoria',
                label: 'Victoria',
            },
        ],
    },
    {
        value: 'MB',
        label: 'MB',
        children: [
            {
                value: 'Winnipeg',
                label: 'Winnipeg',
            },
            {
                value: 'Brandon',
                label: 'Brandon',
            },
        ],
    },
    {
        value: 'ON',
        label: 'ON',
        children: [
            {
                value: 'Toronto',
                label: 'Toronto',
            },
            {
                value: 'Ottawa',
                label: 'Ottawa',
            },
            {
                value: 'Mississauga',
                label: 'Mississauga',
            },
        ],
    },
    {
        value: 'QC',
        label: 'QC',
        children: [
            {
                value: 'Montreal',
                label: 'Montreal',
            },
            {
                value: 'Quebec',
                label: 'Quebec',
            },
        ],
    },

]
const formItemLayout = {
    labelCol: {
        span: 9
    },
    wrapperCol: {
        span: 6
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        span: 16,
        offset: 9
    }
}


const Register = () => {
    const [form] = Form.useForm()
    const {registerStore}=useStore()
    const navigate=useNavigate()

    const onFinished = async (values) => {
        await registerStore.setUserForm(values)
        const registerInfo = registerStore.registerForm

        if (registerInfo.status!==1){
            navigate('/')
            message.success(`Register successfully!`)
        }else {
            message.error(registerInfo.message)
        }

    }

    const onFinishedFailed = (err) =>{
        console.log('Failed: ', err)
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="1">+1</Option>
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    )

    return (
        <div className="register">
            <Card className="register-container">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinished}
                    onFinishFailed={onFinishedFailed}
                    initialValues={{
                        residence: ['MB', 'Winnipeg'],
                        prefix: '1',
                    }}
                    scrollToFirstError
                >
                    <div className="register-heading">Register an Account</div>
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
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                min: 6,
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
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

                    <Form.Item
                        name="residence"
                        label="Habitual Residence"
                        rules={[
                            {
                                type: 'array',
                                required: true,
                                message: 'Please select your habitual residence!',
                            },
                        ]}
                    >
                        <Cascader options={residences} />
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

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="pages/account/register#">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" shape="round">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>

    );
};

export default Register;
