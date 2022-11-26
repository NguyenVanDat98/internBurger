
function Ingredient(props) {
    const {children,className} = props

    return (
     <div className={`ingredient ${className}`} >
        {children}
     </div>   
    )
}



export default Ingredient
