import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
                                                        // productsss up to our mind want to put
export const fetchProduct  = createAsyncThunk("product/productsss",async () =>{
                                                                    // product database name
    const {data} = await axios.get(`https://pharmacy-api.kstech-kh.com/api/v1/product`)
    return data
})  


// we have to initialize this otherwise it will error
const initialState ={
    loading:false,

    // when we fetch data we start from here
    // example   products?.data?.map(i=>{i.title})
    products:[],
    error:false,
}
const productSlice = createSlice ({
    // products up to our mind
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
                        // fetchProduct is the name of export const of this is (it is above)
        builder.addCase(fetchProduct.pending,(state,action) =>{
            state.loading = true;
        });
                         // fetchProduct is the name of export const of this is (it is above)
        builder.addCase(fetchProduct.fulfilled,(state,action) =>{
            state.loading = false;
            state.error= false;
            state.products = action.payload;
        });
                         // fetchProduct is the name of export const of this is (it is above)
        builder.addCase(fetchProduct.rejected,(state,action) =>{
            state.loading= false;
            state.error = true;
            state.products= null;
        });
    }
})
export default productSlice.reducer;