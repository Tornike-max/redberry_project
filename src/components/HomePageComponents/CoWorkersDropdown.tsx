import { Key, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useGetWorkers } from "../../hooks/useGetWorkers";

const CoWorkersDropdown = ({
    coWorkersDropdown,
  setCoWorkersDropdown,
}: {
    coWorkersDropdown: boolean;
  setCoWorkersDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {data,isPending} = useGetWorkers()

  useEffect(() => {
    const workersFromURL = searchParams.get("departments");
    if (workersFromURL) {
      setSelectedPriorities(workersFromURL.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCoWorkersDropdown(false);
      }
    };

    if (coWorkersDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [coWorkersDropdown, setCoWorkersDropdown]);

  const toggleworker = (workerValue: string) => {
    setSelectedPriorities((prevSelected) =>
      prevSelected.includes(workerValue)
        ? prevSelected.filter((worker) => worker !== workerValue)
        : [...prevSelected, workerValue] 
    );
  };

  const applyworkerFilter = () => {
    if (selectedPriorities.length > 0) {
      searchParams.set("departments", selectedPriorities.join(","));
    } else {
      searchParams.delete("departments");
    }
    setSearchParams(searchParams);

    setCoWorkersDropdown(false);
  };

  if (isPending) return <p>Loading...</p>;


  console.log(data)
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setCoWorkersDropdown(!coWorkersDropdown)}
        className={`px-4 text-lg rounded-md flex items-center gap-2`}
      >
        <span className="font-medium">დეპარტამენტი</span>
        <span>{coWorkersDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>
      {coWorkersDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-md rounded-lg border-[1px] border-[#8338EC] p-6 z-10 w-[650px] space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {data?.map(
              (worker: { id: Key | null | undefined; name: string,surname:string,avatar:string }) => (
                <label key={worker.id} className="flex items-center gap-2 cursor-pointer text-nowrap">
                <input
                    type="checkbox"
                    value={worker.name}
                    checked={selectedPriorities.includes(worker.name)}
                    onChange={() => toggleworker(worker.name)}
                    className="w-5 h-5 accent-purple-500"
                  />
                  <img className="size-7 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />

                  <span className="text-md">{worker.name} {worker.surname}</span>
                </label>
              )
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={applyworkerFilter}
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

export default CoWorkersDropdown;