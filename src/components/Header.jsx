import { Button, Col, Row } from "antd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getUserEmail } from "../apiMethod/apiMethod";
import { auth } from "../firebaseCfg";
import { login, setUser } from "../redux/actionUser";
// import { subscribeUser } from "../subscription";


function Header(props) {
    const navi = useNavigate()
    const data = useSelector(_=>_.user.auth)
    const dispatch = useDispatch()
    const  _= useCallback(()=>{ 
        onAuthStateChanged(auth, (currentUser)=>{ 
       if(currentUser){
           dispatch(login(currentUser))
        }
    })   },[auth])  
    useEffect(()=>{
        if(!data){
            _()          
        }  else{
             getUserEmail(data.email).then((_) => {
                dispatch(setUser(_[0]));
              });
        }        
        

    },[data])
const logout = ()=>{
 signOut(auth)
 .then((_)=>{
    console.log(_);
     dispatch(login(_))
    //  subscribeUser()
     navi("/internBurger/login")
 })

}
    return (
        <Row >
            <Col className='header' span={24}  >
            <ul>
                <li><Link to="/internBurger/">Build Burger</Link></li>
                {!data&& <li><Link to="/internBurger/login">Login</Link></li> }
                {data &&  <li><a onClick={logout }>Logout</a></li>}
               
                {data &&<li><Link to="/internBurger/orders">Order</Link></li>}
            
            </ul>
            </Col>
        </Row>
    )
}


export default Header
