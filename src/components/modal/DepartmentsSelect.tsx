import {
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
  } from "react-hook-form";
  import { HiMiniCheck } from "react-icons/hi2";
import { CreateWorkerInterface } from "../../types/types";
import { useGetDepartments } from "../../hooks/useGetDepartments";
import { Key} from "react";
  
  type FormTypes = {
    register: UseFormRegister<CreateWorkerInterface>;
    trigger: UseFormTrigger<CreateWorkerInterface>;
    errors: FieldErrors<CreateWorkerInterface>;
  };
  
  const DepartmentsSelect = ({ register, trigger, errors }: FormTypes) => {
    const {data,isPending} = useGetDepartments();

    if(isPending) return <p>Loading...</p>
    return (
      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <label className="font-firago font-[500] text-[14px] leading-[16.8px]">
            დეპარტამენტები *
          </label>
          <select
            {...register("department_id", {
              required: "სახელი სავალდებულოა",
              validate: (val) =>
                val !== 0 || "დეპარტამენტის არჩევა სავალდებულოა",
            })}
            className={`w-[50%] rounded-[6px] border-[1px] ${
              errors.department_id ? "border-[#F93B1D]" : "border-[#808a93]"
            }  p-[10px]`}
            onBlur={() => trigger("department_id")}
          >
            {data.map((department_id: { id: Key; name: string | number  })=>(
                <option key={department_id.id} value={String(department_id.id)}>{department_id.name}</option>
            ))}
        </select> 
          {errors.department_id && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.department_id.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default DepartmentsSelect;