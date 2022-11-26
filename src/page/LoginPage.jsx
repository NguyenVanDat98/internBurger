import { Button, Col, Divider, Form, Input, Row } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserEmail } from "../apiMethod/apiMethod";
import { auth } from '../firebaseCfg';
import { setUser } from "../redux/actionUser";

function LoginPage(props) {
  const {} = props;
  const [inputEmail, setEmail]=useState("")
  const navi = useNavigate()
  const param = useLocation()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      const signIn = await signInWithEmailAndPassword(auth, values.email,values.password)
      await getUserEmail(values.email).then(_=>{dispatch(setUser(_[0]))})
      signIn && navi("/")
    } catch (error) {
            console.log(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Row >
        <Col span={8} offset={8}>
            
        <Form
        className='form'
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <h2>Sign in</h2>
        <Divider/>
      <Form.Item 
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input value={inputEmail} onChange={(e)=>{setEmail(e.target.value)}} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password  />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="dashed" onClick={()=>{navi(-1)}} htmlType="button">
          Cancel
        </Button>
        <span style={{marginRight:"10px"}}>  </span>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
        
      </Form.Item>
      <Divider>OR</Divider>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button onClick={()=>{navi({pathname:"/signUp", hash: param.hash})}} type="primary" htmlType="button">
          Sign up
        </Button>
        
      </Form.Item>
    </Form>
        </Col>
    </Row>
  );
}

export default LoginPage;
