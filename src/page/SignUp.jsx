import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseCfg';
import { AddUser } from '../apiMethod/apiMethod';
import { setUser } from '../redux/actionUser';


function SignUp(props) {
    const {} = props
    const navi = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {

        try {
            const user = await createUserWithEmailAndPassword(auth, values.email,values.password)
          const {email,address,userName,telephone,password}= values
            AddUser("addUser",JSON.stringify({
              userName : userName,
              email : email,
              address : address,
              password : password,
              telephone : telephone
            } )).then(res => {
              res.status===200&& navi("/") 
              dispatch(setUser(values)) 
          })
        } catch (error) {
                console.log(error.message);
        }
        console.log('Success:', values.email , values.password);
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
        <h2>Sign Up</h2>
        <Divider/>
      <Form.Item 
        label="Username"
        name="userName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Email"
        name="email"
        rules={[{ required: true,min:8, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Telephone"
        name="telephone"
        rules={[{ required: true, message: 'Please input your telephone!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true,min:6, message: 'Please input your password!' }]}
      >
        <Input.Password  />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="dashed" onClick={()=>{navi(-1)}} htmlType="button">
          Cancel
        </Button>
        <span style={{marginRight:"10px"}}>  </span>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        
      </Form.Item>
    </Form>
        </Col>
    </Row>
    )
}



export default SignUp
