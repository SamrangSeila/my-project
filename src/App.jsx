import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import fetchlatesproduct from './assets/components/Fetch_Data/FetchLatesteProduct'
import './App.css'
import { fetchProduct } from './assets/Redux/Redux_Latest_Product/latest_product'
import FetchLatesteProduct from './assets/components/Fetch_Data/FetchLatesteProduct'
import Categories from '../src/assets/components/Categories/categories'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="grid grid-rows-1">
     <FetchLatesteProduct/>
     <Categories />
      </div>
    </div>
  )
}
export default App
