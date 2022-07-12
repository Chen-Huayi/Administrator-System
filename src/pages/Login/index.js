import {Card, Form, Input, Button, Checkbox, message} from "antd";
import logo from 'src/assets/1.jpg'
import './index.scss'
import {useStore} from "src/store";
import {useNavigate} from 'react-router-dom'


function Login() {
    const {loginStore}=useStore()
    const navigate=useNavigate()

    function onFinished(values){
        console.log(values)
        loginStore.getToken({
            mobile: values.username,
            code: values.password
        })
        navigate('/', {replace: true})
        message.success('success')
    }

    function onFinishedFailed(err){
        console.log('Failed: ', err)
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* form */}

                <Form
                    initialValues={{
                        remember: true,
                        mobile: 13811111111,
                        code: 246810
                    }}
                    onFinish={onFinished}
                    onFinishFailed={onFinishedFailed}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号码格式不对',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: '请输入手机号',
                                validateTrigger: 'onBlur'
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                len: 6,
                                message: '验证码6个字符',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: '请输入验证码'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" maxLength={6} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="login-checkbox-label">
                            I agree「xxxx」and「xxxx」
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}

export default Login
