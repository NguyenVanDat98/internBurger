import { Button, Tooltip } from "antd"
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
                <Button onClick={handleInct} shape="circle"  size="large"> Less</Button>

                <span>{temp}</span>
            <Tooltip title="Limit is 3">
                <Button onClick={handleDes} type="primary" shape="circle"  size="large"> More</Button>
            </Tooltip>

    
        
        </div>
    )
}



export default Option
