import { Button, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { decremented, incremented } from "../redux/actionburger"


function Option(props) {
    const {children,keyy} = props
     const product =  useSelector(_=>_.burger)
     const dispatch = useDispatch()
const temp = product.product[keyy]
     
    const handleInct=()=>{
        dispatch(decremented(keyy))
    }
    const handleDes=()=>{
        dispatch(incremented(keyy))

    }

    return (
        <div className="option">
    
            <div  className="product">
                {children}
            </div>
            <Space>
            <Button onClick={handleInct} disabled={temp===0?true:false } > Less</Button>
            <span>{temp}</span>

                <Button onClick={handleDes} type="primary"  disabled={temp===3?true:false } > More</Button>

    </Space>
                {/* <Button onClick={handleInct} disabled > Less</Button>
                <span>{temp}</span>
            <Tooltip title="Limit is 3">
                <Button onClick={handleDes} type="primary"   > More</Button>
            </Tooltip> */}

    
        
        </div>
    )
}



export default Option
