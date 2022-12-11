import { Button, Divider, Form, Input } from 'antd'
import React from 'react'

function FormOtp({onSubmit,errSubmit}) {
    return (
        <Form 
        className="form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16,offset:2 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={errSubmit}
        autoComplete="on"
        >
         
          {/* {form login by phone number} */}
          <h2>Typing OTP from Phone</h2>
          <Divider />
          <Form.Item
            label="Otp"
            name="otp"
            rules={[{ required: true, message: "Please input your Otp!" }]}
          >
            <Input
            />
          </Form.Item>
          <Divider />
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>

            <Button
              type="primary"              
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
    )
}

export default FormOtp

