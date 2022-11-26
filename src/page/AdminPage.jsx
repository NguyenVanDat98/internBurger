import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getDataAll } from "../apiMethod/apiMethod";
const columns = [
  {
    title: "Ingredients",
    dataIndex: "ingredients",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
];
function AdminPage(props) {
  const {} = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataOrder = async () => {
      const rest = await getDataAll("burgers");
      const changeData = rest.map((e, i) => {
        const ingredients = `salad (${e?.salad}), cheese (${e?.cheese}), meat (${e?.meat}) , bacon (${e?.bacon})`;
        const price =
          (parseInt(e?.salad) +
            parseInt(e?.cheese) +
            parseInt(e?.meat) +
            parseInt(e?.bacon)) *
          2 *
          parseInt(e?.quantity);
        return {key: i,
          ingredients: ingredients,
          price: price + " $",
          quantity: e?.quantity,
        };
      });
      setData(changeData);
    };
    getDataOrder();
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

export default AdminPage;
