import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myOrder:
  [ {
    id:null,
    name:null,
    phone:null,
    date:null,
    email:null,
    pharmacy_name:null,
    order_price:null,
    confirmed:null,
    order_pharmacy_number:null,
  }
]
}

export const myOrderSlice = createSlice({
  name: 'myOrder',
  initialState,
  reducers: {
    setMyOrder: (state, action) => {
      state.myOrder = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMyOrder } = myOrderSlice.actions

export const selectmyOrder = state=> state.myOrder.myOrder;

export default myOrderSlice.reducer