import { createSlice } from "@reduxjs/toolkit"

export const burger = createSlice({
    name: 'burger',
    initialState: {
      product : {
        salad :1,
        meat:1,
        cheese: 1,
        bacon:1,
        quantity:1,
      },
      note:""
    },
    reducers: {
        incremented: (state,action)=>{
            if(state.product[action.payload] < 3 ){
                state.product[action.payload]++
            }

        } 
        ,
        decremented: (state,action)=>{
            if(state.product[action.payload]>0){
                state.product[action.payload]--
            }
        },
        incrementedquantity: (state,action)=>{
            state.product.quantity++
        },
        
        decrementedquantity: (state,action)=>{
             if(state.product.quantity>1){
                state.product.quantity--
            }
        },
    }
  })
   
  
  export const { incremented,decremented,incrementedquantity, decrementedquantity} = burger.actions