import { Key, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useGetPriorities } from "../../hooks/useGetPriorities";

const PrioritiesDropdown = ({
  showRegionDropdown,
  setShowRegionDropdown,
}: {
  showRegionDropdown: boolean;
  setShowRegionDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useGetPriorities();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const regionsFromURL = searchParams.get("departments");
    if (regionsFromURL) {
      setSelectedRegions(regionsFromURL.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowRegionDropdown(false);
      }
    };

    if (showRegionDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRegionDropdown, setShowRegionDropdown]);

  const toggleRegion = (regionValue: string) => {
    setSelectedRegions((prevSelected) =>
      prevSelected.includes(regionValue)
        ? prevSelected.filter((region) => region !== regionValue)
        : [...prevSelected, regionValue] 
    );
  };

  const applyRegionFilter = () => {
    if (selectedRegions.length > 0) {
      searchParams.set("departments", selectedRegions.join(","));
    } else {
      searchParams.delete("departments");
    }
    setSearchParams(searchParams);

    setShowRegionDropdown(false);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowRegionDropdown(!showRegionDropdown)}
        className={`px-4 text-lg rounded-md flex items-center gap-2`}
      >
        <span className="font-medium">დეპარტამენტი</span>
        <span>{showRegionDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>
      {showRegionDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-md rounded-lg border-[1px] border-[#8338EC] p-6 z-10 w-[838px] space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {data?.map(
              (region: { id: Key | null | undefined; name: string }) => (
                <label key={region.id} className="flex items-center gap-2 cursor-pointer text-nowrap">
                  <input
                    type="checkbox"
                    value={region.name}
                    checked={selectedRegions.includes(region.name)}
                    onChange={() => toggleRegion(region.name)}
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span className="text-md">{region.name}</span>
                </label>
              )
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={applyRegionFilter}
              className="px-4 py-2 max-w-[155px] w-full bg-[#8338EC] text-white rounded-[20px] cursos-pointer"
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrioritiesDropdown;