/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DepartmentsDropdown from "./DepartmentsDropdown";
import PrioritiesDropdown from "./PrioritiesDropdown";
import CoWorkersDropdown from "./CoWorkersDropdown";
import { FilterInterface } from "../../types/types";



const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterInterface>({
    department: searchParams.get("department") || "",
    priority: searchParams.get("priority") || "",
    worker: searchParams.get("worker") || "",
  });
  const [showDepartmentsDropdown, setshowDepartmentsDropdown] = useState(false);
  const [prioritiesDropdown, setPrioritiesDropdown] = useState(false);
  const [coWorkersDropdown, setCoWorkersDropdown] = useState(false);

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
      setshowDepartmentsDropdown(openDropdown === "region");
      setPrioritiesDropdown(openDropdown === "price");
      setCoWorkersDropdown(openDropdown === "area");
    };

    if (showDepartmentsDropdown) closeAllDropdownsExcept("region");
    else if (prioritiesDropdown) closeAllDropdownsExcept("price");
    else if (coWorkersDropdown) closeAllDropdownsExcept("area");
  }, [
    showDepartmentsDropdown,
    prioritiesDropdown,
    coWorkersDropdown 
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

 

  return (
        <div className="w-full border-[#DBDBDB] rounded-[10px] flex items-center gap-4  z-30">
          <DepartmentsDropdown
            showDepartmentsDropdown={showDepartmentsDropdown}
            setshowDepartmentsDropdown={setshowDepartmentsDropdown}
          />
          <PrioritiesDropdown
            prioritiesDropdown={prioritiesDropdown}
            setPrioritiesDropdown={setPrioritiesDropdown}
          />
          <CoWorkersDropdown
          coWorkersDropdown={coWorkersDropdown}
          setCoWorkersDropdown={setCoWorkersDropdown}
        />
        </div>
  );
};

export default FilterSection;