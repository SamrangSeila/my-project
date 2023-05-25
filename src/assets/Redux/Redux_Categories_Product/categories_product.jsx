import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
export const fetchcategories =  createAsyncThunk('product/category',async() =>{
  const {data} = await axios.get(`https://pharmacy-api.kstech-kh.com/api/v1/category`)
  return data
})
const initialState ={
  loading:false,
  categories:[],
  error:false,
}
const cateoriesSlice = createSlice({
  name:"categories",
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(fetchcategories.pending,(state,action) => {
      state.loading=true;
    });
    builder.addCase(fetchcategories.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=false;
      state.categories=action.payload;
    });
    builder.addCase(fetchcategories.rejected,(state,action) =>{
      state.loading=false;
      state.error=true;
      state.categories=null;
    });
  }
})


export default cateoriesSlice.reducer;
