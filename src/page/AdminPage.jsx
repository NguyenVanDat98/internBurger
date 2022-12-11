import { Table } from "antd";
import React, { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";
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

  const fetchOrder = async()=>  await getDataAll("burgers");
  const {status,data,refetch }=useQuery(["get"],fetchOrder,{retry : 2 , retryDelay:500})


useEffect(()=>{
  const  changenal = new BroadcastChannel("sw-messages")
  changenal.addEventListener("message",()=>{
    console.log('cax');
    refetch()
  })
},[])
  const [dataa, setData] = useState([]);

  useEffect(() => {
   if(!data){
    return
   }
      const changeData = data.map((e, i) => {
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

  }, [data]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
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
      <Table rowSelection={rowSelection} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}} size={"small"} columns={columns} dataSource={dataa} />
    </div>
  );
}

export default AdminPage;
