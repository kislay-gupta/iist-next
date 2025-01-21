import React from "react";
import { FaTruck, FaHeadset, FaExchangeAlt, FaBoxes } from "react-icons/fa";

const Feature = () => {
  return (
    <div className="mx-auto w-full max-w-7xl bg-white px-4 py-5">
      <div className="grid grid-cols-3 gap-5 border-b-2 border-t-2 border-primary py-8 lg:grid-cols-4">
        {/* :FAST DELIVERY */}
        <div className="col-span-full flex flex-col items-center justify-center md:col-span-1 md:flex-row">
          <div className="inline-flex w-1/3 items-center justify-center rounded-md bg-indigo-100 py-2">
            <FaTruck className="size-10 fill-current text-primary" />
          </div>
          <p className="flex w-full flex-col text-center text-gray-700 md:ml-3 md:text-left">
            <span className="text-sm font-bold">FAST DELIVERY</span>
            <span className="text-sm font-semibold">
              (Free on orders over ₹999)
            </span>
          </p>
        </div>

        {/* :24/7 SUPPORT */}
        <div className="col-span-full flex flex-col items-center justify-center md:col-span-1 md:flex-row">
          <div className="inline-flex w-1/3 items-center justify-center rounded-md bg-indigo-100 py-2">
            <FaHeadset className="size-10 fill-current text-primary" />
          </div>
          <p className="flex flex-col text-center text-gray-700 md:ml-3 md:text-left">
            <span className="text-sm font-bold">24/7 SUPPORT</span>
            <span className="text-sm font-semibold">(Always here to help)</span>
          </p>
        </div>

        {/* :HASSLE-FREE RETURNS */}
        <div className="col-span-full flex flex-col items-center justify-center md:col-span-1 md:flex-row">
          <div className="inline-flex w-1/3 items-center justify-center rounded-md bg-indigo-100 py-2">
            <FaExchangeAlt className="size-10 fill-current text-primary" />
          </div>
          <p className="flex flex-col text-center text-gray-700 md:ml-3 md:text-left">
            <span className="text-sm font-bold">EASY RETURNS</span>
            <span className="text-sm font-semibold">
              (30-day return policy)
            </span>
          </p>
        </div>

        {/* :BULK ORDERS */}
        <div className="col-span-full flex flex-col items-center justify-center md:col-span-1 md:flex-row">
          <div className="inline-flex w-1/3 items-center justify-center rounded-md bg-indigo-100 py-2">
            <FaBoxes className="size-10 fill-current text-primary" />
          </div>
          <p className="flex flex-col text-center text-gray-700 md:ml-3 md:text-left">
            <span className="text-sm font-bold">BULK DISCOUNTS</span>
            <span className="text-sm font-semibold">(Special pricing)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
