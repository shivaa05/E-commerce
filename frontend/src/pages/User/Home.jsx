import React from 'react'
import Navbar from '../../components/User/Navbar'
import HeroSection from '../../components/User/HeroSection'
import SingleProduct from '../../components/User/SingleProduct'
import { useProductStore } from '../../store/ProductStore'
const Home = () => {
  const { products } = useProductStore();
  return (
    <div className='w-full h-full'>
      <Navbar/>
      <HeroSection />
      <div className='grid grid-cols-2 md:grid-cols-4 lg:px-24 md:gap-4'>
        {
          products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Home
