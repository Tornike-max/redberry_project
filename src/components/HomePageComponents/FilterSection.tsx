import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DepartmentsDropdown from "./DepartmentsDropdown";
import PrioritiesDropdown from "./PrioritiesDropdown";



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
  const [prioritiesDropdown, setPrioritiesDropdown] = useState(false);
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
      setPrioritiesDropdown(openDropdown === "price");
      setShowAreaDropdown(openDropdown === "area");
      setShowBedroomsDropdown(openDropdown === "bedrooms");
    };

    if (showRegionDropdown) closeAllDropdownsExcept("region");
    else if (prioritiesDropdown) closeAllDropdownsExcept("price");
    else if (showAreaDropdown) closeAllDropdownsExcept("area");
    else if (showBedroomsDropdown) closeAllDropdownsExcept("bedrooms");
  }, [
    showRegionDropdown,
    prioritiesDropdown,
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
        <div className="w-full border-[#DBDBDB] rounded-[10px] flex items-center gap-4  z-30">
          <DepartmentsDropdown
            showRegionDropdown={showRegionDropdown}
            setShowRegionDropdown={setShowRegionDropdown}
          />
          <PrioritiesDropdown
            showRegionDropdown={showRegionDropdown}
            setShowRegionDropdown={setShowRegionDropdown}
          />
          <DepartmentsDropdown
          showRegionDropdown={showRegionDropdown}
          setShowRegionDropdown={setShowRegionDropdown}
        />
        </div>
  );
};

export default FilterSection;