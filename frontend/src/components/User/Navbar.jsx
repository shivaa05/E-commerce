import React, { useState } from "react";
import { Handbag, Heart, LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../../store/AuthStore";
import { useUserStore } from "../../store/UserStore";
const Navbar = () => {
  const { user, logoutFunction } = useAuthStore();
  const [sidePanelSmall, setSidePanelSmall] = useState(false);
  const [popUpLarge, setPopUpLarge] = useState(false);
  const { cart } = useUserStore();
  return (
    <nav className="py-2 fixed top-0 left-0 w-full z-10 flex flex-col gap-4 md:flex md:justify-between md:items-center md:flex-row md:px-[4vw] md:py-4 bg-white">
      {/* small screen navbar */}
      <div className="px-4 flex justify-between items-center border-b border-zinc-300/50 pb-2 shadow-sm md:hidden">
        {/* left */}
        <div className="flex items-center gap-4">
          <Menu
            className="size-6 cursor-pointer"
            onClick={() => setSidePanelSmall(true)}
          />
          <img src="./logo.svg" alt="Logo" className="size-8" />
        </div>

        {/* right */}
        <div className="flex items-center gap-5">
          <Heart className="size-6 cursor-pointer text-gray-700" />
          <div className="relative">
            <Handbag className="size-6  cursor-pointer text-gray-700" />
            <div className="absolute h-4 w-4 bg-[#ff3e6c] rounded-full -top-1 -right-1.5 flex justify-center items-center text-[10px] font-bold text-white">
              {cart.length}
            </div>
          </div>
        </div>
      </div>

      {/* Small screen search bar */}
      <div className="border border-zinc-400 shadow-lg flex gap-2 px-4 py-1.5 rounded-full items-center mx-4 md:hidden">
        <Search className="size-6 text-gray-500" />
        <input
          type="text"
          className="w-full outline-none"
          placeholder="Search for brands and products"
        />
      </div>

      {/* Side panel for small screen */}
      {sidePanelSmall && (
        <div className="md:hidden absolute h-[101vh] top-0 left-0 border w-2/3 bg-zinc-500/30 backdrop-blur-xs flex flex-col py-2">
          <div className="flex justify-between items-center p-2 border-b">
            <div className="text-2xl font-bold">Myntra</div>
            <X
              className="size-7 cursor-pointer"
              onClick={() => setSidePanelSmall(false)}
            />
          </div>

          <div className="px-2 flex flex-col gap-4 mt-5">
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Home
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Men
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Women
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Kids
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Beauty
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Home & Kitchen
            </div>
            <div className="text-lg px-2 cursor-pointer font-semibold border-b border-zinc-600">
              Electronics
            </div>
          </div>

          <div className="absolute w-full bottom-0  text-lg font-semibold px-4 flex flex-col justify-center gap-2 pb-5">
            <div>Profile</div>
            <div
              className="flex gap-2 cursor-pointer items-center text-rose-600"
              onClick={() => logoutFunction()}
            >
              <LogOut className="size-5" /> Logout
            </div>
          </div>
        </div>
      )}

      {/* Large screen navbar */}

      {/* left */}
      <div className="hidden md:flex items-center gap-5">
        <img src="./logo.svg" alt="Logo" className="size-10" />
      </div>

      {/* center */}
      <div className="hidden md:flex flex-1 items-center mx-[3vw] gap-8">
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Men
        </div>
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Women
        </div>
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Kids
        </div>
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Beauty
        </div>
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Home & Kitchen
        </div>
        <div className="hover:scale-110 hover:text-rose-500 cursor-pointer transform duration-150 md:hidden lg:block font-semibold text-gray-700 uppercase text-sm">
          Electronics
        </div>
        <div className=" border border-zinc-400 shadow-lg flex gap-2 px-4 py-1.5 rounded-lg items-center mx-4 flex-1">
          <Search className="size-6 text-gray-500" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Search for brands and products"
          />
        </div>
      </div>

      {/* right */}
      <div className="relative hidden md:flex items-center gap-7">
        <div className="flex flex-col justify-center items-center text-xs font-semibold">
          <Heart className="size-5 cursor-pointer text-gray-700" />
          <div>Wishlist</div>
        </div>
        <div className="relative flex flex-col justify-center items-center text-xs font-semibold">
          <Handbag className="size-5 cursor-pointer text-gray-700" />
          <div>Cart</div>
          <div className="absolute h-4 w-4 bg-[#ff3e6c] rounded-full -top-1 -right-1.5 flex justify-center items-center text-[10px] font-bold text-white">
            {cart.length}
          </div>
        </div>
        <div
          className="h-10 w-10 border rounded-full flex cursor-pointer justify-center items-center text-lg font-medium bg-green-800/80 text-white"
          onClick={() => setPopUpLarge(!popUpLarge)}
        >
          {user.name[0].toUpperCase()}
        </div>

        {/* Pop up for large screen */}
        {popUpLarge && (
          <div className="hidden absolute top-12 right-0 bg-rose-100/70 backdrop-blur-xs px-3 py-2 rounded-lg md:flex flex-col gap-1 shadow-lg">
            <div>Profile</div>
            <div
              className="flex gap-2 cursor-pointer items-center text-rose-600"
              onClick={() => logoutFunction()}
            >
              <LogOut className="size-5" /> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
