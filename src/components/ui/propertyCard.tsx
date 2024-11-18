import React from "react";
import { Property } from "../../types/property";

export default function Card({ propertyDetail }: { propertyDetail: Property }) {
  const { address, bedrooms, bathrooms, type, price, squareFootage } =
    propertyDetail;
  return (
    <div className="p-3 border border-grey rounded-md bg-white shadow-md">
      <h3 className="font-bold text-xl">${price}</h3>
      <p>
        {bedrooms} <span className=" text-gray-500">Bds</span> | {bathrooms}{" "}
        <span className=" text-gray-500">Ba</span> | {squareFootage}{" "}
        <span className=" text-gray-500">Sqft</span>
      </p>
      <p>{address}</p>
      <p>
        Type: <strong>{type}</strong>
      </p>
    </div>
  );
}
