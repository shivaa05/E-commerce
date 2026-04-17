import React from 'react'
import {ArrowLeft} from 'lucide-react'
import {useNavigate} from "react-router-dom"
const Wishlist = () => {
  const navigate = useNavigate()

  return (
    <div className="mb-10">
      <div className="h-16 border-b flex items-center gap-2 px-4 text-lg font-semibold uppercase text-[#393b53]">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
        WishList
      </div>
    </div>
  )
}

export default Wishlist