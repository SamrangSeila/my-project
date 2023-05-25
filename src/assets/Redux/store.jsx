import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../Redux/Redux_Latest_Product/latest_product'
import categoryReducer from '../Redux/Redux_Categories_Product/categories_product'
const store = configureStore({
    reducer:{
        productss:productReducer,
        categoriess:categoryReducer,
    }
})
export default store;