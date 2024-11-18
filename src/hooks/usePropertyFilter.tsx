import { useState, useEffect } from "react";
import { Property } from "../types/property";

interface PriceRange {
  min: string;
  max: string;
}

const usePropertyFilter = (initialProperties: Property[]) => {
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: "",
    max: "",
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const minPrice = Number(priceRange.min);
    const maxPrice = Number(priceRange.max);

    const result = initialProperties.filter((property) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        [property.address, property.type].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesPriceRange =
        (minPrice === 0 || property.price >= minPrice) &&
        (maxPrice === 0 || property.price <= maxPrice);

      const matchesSelectedTypes =
        selectedTypes.length === 0 || selectedTypes.includes(property.type);

      return matchesSearchTerm && matchesPriceRange && matchesSelectedTypes;
    });

    setFilteredProperties(result);
  }, [searchTerm, priceRange, selectedTypes, initialProperties]);

  return {
    filteredProperties,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    selectedTypes,
    setSelectedTypes,
  };
};

export default usePropertyFilter;
