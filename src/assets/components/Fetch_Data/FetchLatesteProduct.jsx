import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../Redux/Redux_Latest_Product/latest_product';

const FetchLatesteProduct = () => {
                                          // products name must be like to products in store
  const store = useSelector(state => state.productss);
  const {products} = store;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct())
  },[dispatch])
  return (
    <div className='grid grid-rows-1 grid-flow-row-dense '>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
          {      
            products?.data?.map(i =>(
             <div className="product">
             <span>{}</span>
             <img className='h-40 w-full' src={i?.images[0]?.url} alt="" />
             <span>{i?.title}</span>
             </div>
            ))
          }
      </div>
    </div>
  )
}
export default FetchLatesteProduct
