import { Button, Divider, Form, Input } from 'antd'

import React from 'react'


function FormLogin({onFinish,onFinishFailed,inputEmail,changeEmail,cancel,login,handleLoginByPhone}) {
    return (
        <Form
          className="form"
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16,offset:2 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h2>Sign in</h2>
          <Divider />
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              value={inputEmail}
              onChange={changeEmail}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16, xs :{span:20,offset:4} }}>
            <Button
              type="dashed"
              onClick={cancel}
              htmlType="button"
            >
              Cancel
            </Button>
            <span style={{ marginRight: "10px" }}> </span>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
            <span style={{ marginRight: "10px" }}> </span>
            <Button  
                onClick={handleLoginByPhone}
            type="primary" htmlType="button">
              Sign in by number phone
            </Button>
          </Form.Item>
          <Divider>OR</Divider>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button
              onClick={login}
              type="primary"
              htmlType="button"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
    )
}

export default FormLogin
