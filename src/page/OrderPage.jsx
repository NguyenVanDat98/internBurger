import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../apiMethod/apiMethod";
// import { subscribeUser } from "../subscription";

function OrderPage(props) {
  const navi = useNavigate();
  const [formuser, setForm] = useState({});
  const dataUser = useSelector((_) => _.user);
  useEffect(() => {
    const { userName, telephone, address, email } = dataUser;
    setForm({
      userName,
      telephone,
      address,
      email,
    });
  }, [dataUser]);
  const dataProduct = useSelector((_) => _.burger);
  const { salad, cheese, meat, bacon, quantity } = dataProduct.product;
  const price = (salad + cheese + bacon + meat) * 2 * quantity;

  const onAddOrder = async () => {
    const _ = addOrder(
      "addOrder",
      JSON.stringify({
        salad,
        meat,
        cheese,
        bacon,
        quantity,
      })
    );
    _.then((__) => {
      if (__.status === 200) {
        alert("Order success");
        // subscribeUser()
        navi("/internBurger/");
      }
    });
  };

  return (
    <Row>
      <Col span={8} offset={8}>
        <form className="formOrder">
          <div className="bill">
            <h4>
              salad <span> {salad}</span>
            </h4>
            <h4>
              cheese <span> {cheese}</span>
            </h4>
            <h4>
              bacon <span> {bacon}</span>
            </h4>
            <h4>
              meat <span> {meat}</span>
            </h4>
            <h3>
              quantity <span> {quantity}</span>
            </h3>
            <h2>
              Price <span> {price} $</span>
            </h2>
          </div>
          <h2>Contact Data</h2>
          <label htmlFor="userName">Username</label>
          <input
            name="userName"
            onChange={(e) => {
              setForm({ ...formuser, [e.target.name]: e.target.value });
            }}
            value={formuser?.userName}
            type="text"
            id="userName"
          />
          <label htmlFor="telephone">Telephone</label>

          <input
            name="telephone"
            onChange={(e) => {
              setForm({ ...formuser, [e.target.name]: e.target.value });
            }}
            value={formuser?.telephone}
            type="text"
            id="telephone"
          />
          <label htmlFor="email">email</label>

          <input
            name="email"
            onChange={(e) => {
              setForm({ ...formuser, [e.target.name]: e.target.value });
            }}
            value={formuser?.email}
            type="text"
            id="email"
          />
          <label htmlFor="address">address</label>

          <input
            name="address"
            onChange={(e) => {
              setForm({ ...formuser, [e.target.name]: e.target.value });
            }}
            value={formuser?.address}
            type="text"
            id="address"
          />
          <label htmlFor="">note</label>
          <textarea
            name="note"
            onChange={(e) => {
              setForm({ ...formuser, [e.target.name]: e.target.value });
            }}
            cols="30"
            rows="5"
          ></textarea>

          <button onClick={onAddOrder} type="button">
            {" "}
            Order
          </button>
        </form>
      </Col>
    </Row>
  );
}

export default OrderPage;
