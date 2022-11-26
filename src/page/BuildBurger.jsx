import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Divider, Row } from "antd";
import {
  decrementedquantity,
  incrementedquantity,
} from "../redux/actionburger";

import { useNavigate } from "react-router-dom";
import Option from "../components/Option";
import PreviewProduct from "../components/PreviewProduct";

function BuildBurger(props) {
  const {} = props;
  const navi = useNavigate();

  const dispatch = useDispatch();
  const { product: data } = useSelector((_) => _.burger);
  const auth = useSelector((_) => _.user.auth);

  const price = () => {
    const { salad, cheese, bacon, meat, quantity } = data;
    return (salad + cheese + bacon + meat) * 2 * quantity;
  };

  const handleChangequantity = (e) => {
    if (e === 1) {
      dispatch(incrementedquantity());
    } else {
      dispatch(decrementedquantity());
    }
  };

  // const [user,SetUser] = useState(null)
  // const userCollectionRef = collection(db,"users")
  //   useEffect(()=>{
  //     const getUsers = async ()=>{
  //       const data = await getDocs(userCollectionRef)
  //       console.log(data)
  //     }

  //     getUsers()
  //   },[])

  return (
    <Row>
      <Col span={10} offset={2}>
        <div className="bor-m10">
          <h3 className="price">
            Price : <span>$ {price()} </span>{" "}
          </h3>
          <Divider />
          <Option keyy="salad"> salad</Option>
          <Option keyy="bacon"> bacon</Option>
          <Option keyy="cheese"> cheese</Option>
          <Option keyy="meat"> meat</Option>
        </div>
      </Col>
      <Col span={10}>
        <PreviewProduct />
        <div className="changeQuantity">
          <Button onClick={() => handleChangequantity(0)}> - </Button>
          <span>{data.quantity}</span>
          <Button type="primary" onClick={() => handleChangequantity(1)}>
            {" "}
            +{" "}
          </Button>
        </div>
        <Divider />
        <div className="btnCheckout">
          <Button
            shape="round"
            onClick={() =>
              navi({
                pathname: auth ? "/order" : "/login",
                hash: auth ? "" : "ok",
              })
            }
          >
            {" "}
            Checkout{" "}
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default BuildBurger;
