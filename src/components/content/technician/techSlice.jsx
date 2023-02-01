import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTech = createAsyncThunk("technicien/getTech",async(_,thunkAPI)=>{
  const res = await fetch('http://localhost/gmao-react/backend/tables/technicien.php')
  const data = await res.json()
  return data
})

export const insertTech = createAsyncThunk("technicien/insertTech",async(techData,thunkAPI)=>{
  const res = await fetch('http://localhost/gmao-react/backend/tables/technicien.php',{
    method :"POST",
    body:JSON.stringify(techData),
    headers:{'Content-type' : 'application/Json ; charset = UTF-8'}
  })
  const data = await res.json()
  return data
})

export const deleteTech = createAsyncThunk("technicien/insertTech",async(id,thunkAPI)=>{
  await fetch(`http://localhost/gmao-react/backend/tables/technicien.php/${id}`,{method :"DELETE"})
})

const techSlice = createSlice({
  name:'technicien',
  initialState:[],
  reducers:{},
  extraReducers : {
    // Get Techniciens
    [getTech.pending] : (state,action)=>{},
    [getTech.fulfilled] : (state,action)=>{
      state = action.payload
      return state
    },
    [getTech.rejected] : (state,action)=>{},

    // Insert Technicien
    [insertTech.pending] : (state,action)=>{},
    [insertTech.fulfilled] : (state,action)=>{
      state = state.push(action.payload)
      return state
    },
    [insertTech.rejected] : (state,action)=>{},

    // Delete Technicien
    [deleteTech.pending] : (state,action)=>{},
    [deleteTech.fulfilled] : (state,action)=>{
      console.log("Deleted")
    },
    [deleteTech.rejected] : (state,action)=>{}
  }
})

export default techSlice