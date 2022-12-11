import { Button, Divider, Form, Input } from 'antd'
import React from 'react'
function FormSignInByPhone({onFinish,onFinishFailed,onChange,phone,onClick}) {
    return (
        <Form 
        className="form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16,offset:2 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        >
           <div id="recaptcha-container"></div>
          {/* {form login by phone number} */}
          <h2>Sign in by Phone</h2>
          <Divider />
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input your Phone!" }]}
          >
            <Input
            value={phone}
              onChange={onChange}
            />
          </Form.Item>
          <Divider />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

            <Button
                  onClick={onClick}      
              htmlType="button"
            >
           Back
            </Button>
            <span style={{margin : "12px"}}></span>
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

export default FormSignInByPhone
