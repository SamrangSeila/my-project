import React , {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchcategories } from '../../Redux/Redux_Categories_Product/categories_product';


const categories = () => {
    const store = useSelector(state => state.categoriess);


    // it must the same to catetories in fetchlatestproduct
    const {categories} = store;
    const dispatch = useDispatch();
    useEffect(() => {
                // fetchcategories name of function in categories_product.jsx example export const fetchcategories ...
       dispatch(fetchcategories())
    }, [dispatch]);
  return (
    <div>
            <div className="grid grid-rows-1">
                <div className="grid md:grid-cols-4 grid-cols-2">
                {
                    categories?.data?.map(a =>(
                    <div className="grid grid-rows-1 grid-flow-dense h-80 ">
                        <div className="grid md:grid-cols-4 grid-cols-2">
                      
                                <div className="categories">
                                <img src="" className='h-20 w-xl bg-red-200' alt="" />
                                <p>{a?.title}</p>
                                <p> {a?.slug} </p>
                                </div>
                         
                        </div>
                    </div>
                    ))
                }
                </div>
            </div>
    </div>
  )
}
export default categories
