import React from 'react'

const HeroSection = () => {
  return (
    <div className="pt-28 md:pt-18 pb-5">
      <img src="./hero.png" alt="" />

      <div className="mt-3">
        <h1 className="font-[font3] text-[7vw] md:text-[4vw] text-rose-600 text-center">
          Everything You Love, Delivered.
        </h1>
        <p className='px-5 text-center font-[font3] max-w-[80vw] mx-[10vw] text-slate-800 md:text-[2vw] md:max-w-[60vw] md:mx-[20vw]'>
          Discover a seamless shopping experience with top-quality products,
          unbeatable prices, and fast delivery—all in one place
        </p>
      </div>

    </div>
  );
}

export default HeroSection