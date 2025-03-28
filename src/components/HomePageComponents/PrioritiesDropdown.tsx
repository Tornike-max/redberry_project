import { Key, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useGetPriorities } from "../../hooks/useGetPriorities";

const PrioritiesDropdown = ({
  prioritiesDropdown,
  setPrioritiesDropdown,
}: {
  prioritiesDropdown: boolean;
  setPrioritiesDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useGetPriorities();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prioritysFromURL = searchParams.get("departments");
    if (prioritysFromURL) {
      setSelectedPriorities(prioritysFromURL.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPrioritiesDropdown(false);
      }
    };

    if (prioritiesDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prioritiesDropdown, setPrioritiesDropdown]);

  const togglepriority = (priorityValue: string) => {
    setSelectedPriorities((prevSelected) =>
      prevSelected.includes(priorityValue)
        ? prevSelected.filter((priority) => priority !== priorityValue)
        : [...prevSelected, priorityValue] 
    );
  };

  const applypriorityFilter = () => {
    if (selectedPriorities.length > 0) {
      searchParams.set("departments", selectedPriorities.join(","));
    } else {
      searchParams.delete("departments");
    }
    setSearchParams(searchParams);

    setPrioritiesDropdown(false);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setPrioritiesDropdown(!prioritiesDropdown)}
        className={`px-4 text-lg rounded-md flex items-center gap-2`}
      >
        <span className="font-medium">დეპარტამენტი</span>
        <span>{prioritiesDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>
      {prioritiesDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-md rounded-lg border-[1px] border-[#8338EC] p-6 z-10 w-[650px] space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {data?.map(
              (priority: { id: Key | null | undefined; name: string }) => (
                <label key={priority.id} className="flex items-center gap-2 cursor-pointer text-nowrap">
                  <input
                    type="checkbox"
                    value={priority.name}
                    checked={selectedPriorities.includes(priority.name)}
                    onChange={() => togglepriority(priority.name)}
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span className="text-md">{priority.name}</span>
                </label>
              )
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={applypriorityFilter}
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