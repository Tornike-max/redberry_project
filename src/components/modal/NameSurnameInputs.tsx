import {
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
    UseFormWatch,
  } from "react-hook-form";
  import { HiMiniCheck } from "react-icons/hi2";
import { CreateWorkerInterface } from "../../types/types";
  
  type FormTypes = {
    register: UseFormRegister<CreateWorkerInterface>;
    trigger: UseFormTrigger<CreateWorkerInterface>;
    watch: UseFormWatch<CreateWorkerInterface>;
    errors: FieldErrors<CreateWorkerInterface>;
  };
  
  const NameSurnameInputs = ({ register, trigger, watch, errors }: FormTypes) => {
    return (
      <div className="w-full flex justify-between items-center gap-[20px]">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <label className="font-firago font-[500] text-[14px] leading-[16.8px]">
            სახელი *
          </label>
          <input
            type="text"
            {...register("name", {
              required: "სახელი სავალდებულოა",
              validate: (val) =>
                val.length >= 2 || "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
            })}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.name ? "border-[#F93B1D]" : "border-[#808a93]"
            }  p-[10px]`}
            onBlur={() => trigger("name")}
          />
          {!watch("name") && !errors.name && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}
  
          {watch("name")?.length >= 2 && !errors.name && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}
  
          {errors.name && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.name.message}</p>
            </div>
          )}
        </div>
  
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <label className="font-[500] text-[14px] leading-[16.8px]">გვარი</label>
          <input
            type="text"
            {...register("surname", {
              required: "გვარი სავალდებულოა",
              validate: (val) =>
                val.length >= 2 || "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს",
            })}
            className={`w-full rounded-[6px] border-[1px] ${
              errors.surname ? "border-[#F93B1D]" : "border-[#808a93]"
            }  p-[10px]`}
            onBlur={() => trigger("surname")}
          />
          {!watch("surname") && !errors.surname && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-[#021526] leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}
  
          {watch("surname")?.length >= 2 && !errors.surname && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] text-green-500 leading-[16.8px]">
              <HiMiniCheck className="text-xl" />
              <p>მინიმუმ 2 სიმბოლო</p>
            </div>
          )}
  
          {errors.surname && (
            <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
              <HiMiniCheck className="text-xl" />
              <p>{errors.surname.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default NameSurnameInputs;