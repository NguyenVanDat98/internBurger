import { Col, Row } from "antd"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebaseCfg"
import { login } from "../redux/actionUser";


function Header(props) {
    const [user,setUser]= useState({})
    const navi = useNavigate()
    const data = useSelector(_=>_.user.auth)

    const dispatch = useDispatch()
    const {} = props
useEffect(()=>{
    const _= onAuthStateChanged(auth, async (currentUser)=>{
        
     dispatch(login(currentUser))
      })          
      return ()=>{
          _()
        }
        
    },[])


const logout = async()=>{

  const _= await signOut(auth)
    navi("/login")

}
    return (
        <Row >
            <Col className='header' span={24}  >
            <ul>
                <li><Link to="/">Build Burger</Link></li>
                {!data&& <li><Link to="/login">Login</Link></li> }
                {data &&  <li><a onClick={logout }>Logout</a></li>}
               
                {data &&<li><Link to="/orders">Order</Link></li>}
            </ul>
            </Col>
        </Row>
    )
}


export default Header
