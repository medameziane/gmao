import techSlice from "./technician/techSlice";
import { configureStore } from '@reduxjs/toolkit'

const myStore = configureStore({
  reducer:{
    technicien : techSlice.reducer
  }
})

export default myStore