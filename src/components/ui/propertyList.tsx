import React, { ChangeEvent } from "react";
import Link from "next/link";
import { Property } from "../../types/property";
import usePropertyFilter from "@hooks/usePropertyFilter";
import Input from "@components/shared/input";
import Checkbox from "@components/shared/checkbox";
import Card from "@components/ui/propertyCard";

interface PropertyListProps {
  initialProperties: Property[];
}

const propertyTypes = ["Single Family", "Condo", "Townhouse", "Apartment"];

const PropertyList: React.FC<PropertyListProps> = ({ initialProperties }) => {
  const {
    filteredProperties,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    selectedTypes,
    setSelectedTypes,
  } = usePropertyFilter(initialProperties);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: Number(e.target.value) || "",
    }));
  };

  const togglePropertyType = (value: string) => {
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  return (
    <section>
      <div className="sticky top-[68px] z-10 bg-gray-100 py-2">
        <div className="grid w-full md:w-2/4">
          <Input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-3">
            <Input
              value={priceRange.min}
              type="number"
              label="Min"
              placeholder="Min price"
              onChange={(e) => handlePriceChange(e, "min")}
              fullWidth
            />
            <Input
              label="Max"
              value={priceRange.max}
              type="number"
              placeholder="Max price"
              onChange={(e) => handlePriceChange(e, "max")}
              fullWidth
            />
          </div>
        </div>

        <div className="p-2 sm:p-4 grid sm:flex items-center gap-2 sm:gap-4">
          <h3 className="text-lg font-bold">Property Types:</h3>
          {propertyTypes.map((propertyType) => (
            <Checkbox
              key={propertyType}
              label={propertyType}
              checked={selectedTypes.includes(propertyType)}
              onChange={() => togglePropertyType(propertyType)}
              id={propertyType}
            />
          ))}
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProperties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card propertyDetail={property} />
            </Link>
          ))}
        </div>
      ) : (
        <h3 className="text-xl text-center p-6">
          ----------- Nothing to show ------------------
        </h3>
      )}
    </section>
  );
};

export default PropertyList;
