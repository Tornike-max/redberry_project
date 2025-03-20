import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DepartmentsDropdown from "./DepartmentsDropdown";
import Button from "../../ui/Button";
import SecondaryButton from "../../ui/SecondaryButton";


const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterInterface>({
    region: searchParams.get("region") || "",
    price: searchParams.get("price") || "",
    area: searchParams.get("area") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  });
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showBedroomsDropdown, setShowBedroomsDropdown] = useState(false);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    const newActiveFilters: string[] = [];

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof FilterInterface];
      if (value) {
        updatedSearchParams.set(key, value);
        if (!newActiveFilters.includes(key)) {
          newActiveFilters.push(key);
        }
      } else {
        updatedSearchParams.delete(key);
      }
    });

    setSearchParams(updatedSearchParams);
    setActiveFilters(newActiveFilters);
  }, [filters]);

  useEffect(() => {
    const closeAllDropdownsExcept = (openDropdown: string) => {
      setShowRegionDropdown(openDropdown === "region");
      setShowPriceDropdown(openDropdown === "price");
      setShowAreaDropdown(openDropdown === "area");
      setShowBedroomsDropdown(openDropdown === "bedrooms");
    };

    if (showRegionDropdown) closeAllDropdownsExcept("region");
    else if (showPriceDropdown) closeAllDropdownsExcept("price");
    else if (showAreaDropdown) closeAllDropdownsExcept("area");
    else if (showBedroomsDropdown) closeAllDropdownsExcept("bedrooms");
  }, [
    showRegionDropdown,
    showPriceDropdown,
    showAreaDropdown,
    showBedroomsDropdown,
  ]);

  const handleFilterChange = (value: string, key: keyof FilterInterface) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilter = (key: keyof FilterInterface) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: "",
    }));
  };

  const handleOpenAgentModal = () => {
    setIsAgentModalOpen(true);
  };

  return (
    <div className="max-w-[1596px] w-full flex justify-center items-start flex-col gap-[16px] my-[24px]">
      <div className="w-full h-[47px] flex justify-center items-start flex-col gap-4">
        <h1 className="text-[34px] leading-[100%] text-[#212529]">დავალებების გვერდი</h1>
        <div className="w-auto h-[47px] border-[1px] border-[#DBDBDB] rounded-[10px] p-[6px] flex items-center gap-4 justify-start z-30">
          <DepartmentsDropdown
            handleFilterChange={handleFilterChange}
            showRegionDropdown={showRegionDropdown}
            setShowRegionDropdown={setShowRegionDropdown}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;