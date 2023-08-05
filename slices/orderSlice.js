import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myOrder: {
    name:null,
    phone:null,
    date:null,
    email:null,
    pharmacy_name:null,
    order_price:null,
    onder_confirm:null,
  }
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