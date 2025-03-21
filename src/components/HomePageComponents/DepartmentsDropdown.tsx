import { Key, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetDepartments } from "../../hooks/useGetDepartments";
import { useSearchParams } from "react-router-dom";

const DepartmentsDropdown = ({
  showDepartmentsDropdown,
  setshowDepartmentsDropdown,
}: {
  showDepartmentsDropdown: boolean;
  setshowDepartmentsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selecteddepartments, setSelecteddepartments] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending } = useGetDepartments();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const departmentsFromURL = searchParams.get("departments");
    if (departmentsFromURL) {
      setSelecteddepartments(departmentsFromURL.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setshowDepartmentsDropdown(false);
      }
    };

    if (showDepartmentsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDepartmentsDropdown, setshowDepartmentsDropdown]);

  const toggledepartment = (departmentValue: string) => {
    setSelecteddepartments((prevSelected) =>
      prevSelected.includes(departmentValue)
        ? prevSelected.filter((department) => department !== departmentValue)
        : [...prevSelected, departmentValue] 
    );
  };

  const applydepartmentFilter = () => {
    if (selecteddepartments.length > 0) {
      searchParams.set("departments", selecteddepartments.join(","));
    } else {
      searchParams.delete("departments");
    }
    setSearchParams(searchParams);

    setshowDepartmentsDropdown(false);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setshowDepartmentsDropdown(!showDepartmentsDropdown)}
        className={`px-4 text-lg rounded-md flex items-center gap-2`}
      >
        <span className="font-medium">დეპარტამენტი</span>
        <span>{showDepartmentsDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>
      {showDepartmentsDropdown && (
        <div className="absolute top-[50px] left-0 bg-white shadow-md rounded-lg border-[1px] border-[#8338EC] p-6 z-10 w-[838px] space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {data?.map(
              (department: { id: Key | null | undefined; name: string }) => (
                <label key={department.id} className="flex items-center gap-2 cursor-pointer text-nowrap">
                  <input
                    type="checkbox"
                    value={department.name}
                    checked={selecteddepartments.includes(department.name)}
                    onChange={() => toggledepartment(department.name)}
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span className="text-md">{department.name}</span>
                </label>
              )
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={applydepartmentFilter}
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

export default DepartmentsDropdown;