import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pharmacy: {
    id: null,
    title: null,
    imgUrl: null,
    rating: null,
    type: null,
    address: null, 
    description: null,
    medications: null,
    lng: null,
    lat: null
  }
}

export const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  reducers: {
    setPharmacy: (state, action) => {
      state.pharmacy = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPharmacy } = pharmacySlice.actions

export const selectpharmacy = state=> state.pharmacy.pharmacy;

export default pharmacySlice.reducer