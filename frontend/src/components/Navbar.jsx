// import React from "react";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { SlHeart } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatarImage from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, Logout } = useAuth();

  const handleLogout = () => {
    Logout();
  };
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);

  return (
    <header className="max-w-screen-2xl mx-auto px-28 py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiOutlineBars3BottomLeft className="size-6" />
          </Link>

          <div className="relative sm:w-72 w-40 space-x-2">
            <CiSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div className=" relative flex items-center md:space-x-3">
          <div className="navigation" ref={dropdownRef}>
            {user ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImage}
                    alt=""
                    className={`size-7 rounded-full ${
                      user ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 ">
                    <ul>
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className=" hidden sm:block">
            <SlHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <GiShoppingCart />
            <span className="text-sm font-semibold sm:ml-1 ">
              {cartItems?.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
