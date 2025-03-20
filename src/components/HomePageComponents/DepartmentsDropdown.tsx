import { Key, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetDepartments } from "../../hooks/useGetDepartments";

const DepartmentsDropdown = ({
  handleFilterChange,
  showRegionDropdown,
  setShowRegionDropdown,
}: {
  handleFilterChange: (value: string, key:string | number) => void;
  showRegionDropdown: boolean;
  setShowRegionDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { data, isPending } = useGetDepartments();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setSelectedRegion(regionValue);
  };

  const applyRegionFilter = () => {
    handleFilterChange(selectedRegion || "", "region");
    setShowRegionDropdown(false);
  };

  if (isPending) return <p>loading...</p>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowRegionDropdown(!showRegionDropdown)}
        className={`px-[16px] py-[8px] text-[16px] hover:bg-[#F3F3F3] rounded-[6px] flex items-center gap-2 ${
          showRegionDropdown && "bg-[#F3F3F3]"
        }`}
      >
        <span className="font-firago font-medium leading-[19.2px] text-[16px]">
          რეგიონი
        </span>
        <span>
          {showRegionDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      {showRegionDropdown && (
        <div className="absolute top-[50px] left-0 bg-[#FFFFFF] shadow-[#02152614] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] z-10 w-[731px] h-auto space-y-[24px]">
          <div className="w-[679px] flex flex-col justify-center items-start">
            <h3 className="text-[18px] font-firago font-medium mb-[12px] px-2 pb-4">
              რეგიონის მიხედვით
            </h3>
            <div className="grid grid-cols-3 gap-[30px]">
              {data?.map(
                (region: { id: Key | null | undefined; name: string }) => (
                  <label
                    key={region.id}
                    className="custom-checkbox max-w-[191px] w-full"
                  >
                    <input
                      type="checkbox"
                      value={region.name}
                      checked={selectedRegion === region.name}
                      onChange={() => toggleRegion(region.name)}
                    />
                    <span></span>
                    <span className="text-[16px] leading-[16.8px] text-[#021526] font-firago font-normal">
                      {region.name}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end mt-[12px]">
            <button
              onClick={applyRegionFilter}
              className="px-[16px] py-[8px] bg-[#F93B1D] text-white rounded-md"
            >
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsDropdown;