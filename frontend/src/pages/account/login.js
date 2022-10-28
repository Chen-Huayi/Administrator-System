import {Button, Card, Checkbox, Form, Input, message} from "antd";
import logo from 'assets/login_logo.jpg'
import {useNavigate} from 'react-router-dom'
import {useStore} from "store";
import './login.scss'

function Login() {
    const {loginStore}=useStore()
    const navigate=useNavigate()

    async function onFinished(values){
        await loginStore.getToken({
            mobile: values.username,
            code: values.password
        })

        navigate('/', {replace: true})

        if (loginStore.token!==''){
            message.success('Successfully login')
        }else {
            message.error('Invalid username or password')
        }
    }

    function onFinishedFailed(err){
        console.log('Failed: ', err)
    }

    // Go to register interface
    function register(){
        navigate('/register')
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />

                <Form
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinished}
                    onFinishFailed={onFinishedFailed}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                // pattern: /^1[3-9]\d{9}$/,
                                // message: '手机号码格式不对',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: 'Username required',
                                validateTrigger: 'onBlur'
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                min: 6,
                                // message: 'At least 6 character password',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: 'Password required'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Password" maxLength={16} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="login-checkbox-label">
                            I agree the terms and conditions
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <div className="submit-button">
                            <Button type="primary" htmlType="submit" size="large" shape="round" style={{width : '100px'}}>
                                Log in
                            </Button>
                        </div>

                    </Form.Item>
                </Form>

                <div className="register-button">
                    <Button type="primary" htmlType="submit" size="large" shape="round" style={{width : '100px'}} onClick={register}>
                        Sign up
                    </Button>
                </div>

            </Card>
        </div>
    )
}

export default Login
