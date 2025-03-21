import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateWorkerInterface } from "../../types/types";
import { useRef } from "react";
import { HiMiniCheck, HiOutlinePlusCircle, HiTrash } from "react-icons/hi2";

type FormTypes = {
  register: UseFormRegister<CreateWorkerInterface>;
  errors: FieldErrors<CreateWorkerInterface>;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const UploadImage = ({
  register,
  errors,
  selectedImage,
  setSelectedImage,
}: FormTypes) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { ref } = register("avatar");
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-start gap-2">
          <label className="font-firago font-[500] text-[14px] leading-[16.8px]">
            ავატარი *
          </label>
        <div
          className={`w-full relative m-auto rounded-[8px] border-[1px] ${
            errors.avatar ? "border-[#F93B1D]" : "border-[#2D3648]"
          }  border-dashed h-[120px] flex justify-center items-center`}
        >
            {selectedImage && (
                <div className="relative w-full">
                <div className="w-full relative m-auto rounded-[8px] border-[1px] border-[#2D3648] border-dashed h-[120px] p-4 flex justify-start items-center gap-4">
                    <div className="relative w-[92px] h-[82px] m-auto">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="w-[88px] h-[88px] object-cover rounded-full"
                    />
                    <HiTrash
                        onClick={() => setSelectedImage(null)}
                        className="absolute w-[30px] h-[30px] bottom-[-7px] right-[-7px] cursor-pointer p-1 bg-[#FFFFFF] text-[#6C757D] border-[1px] border-[#6C757D] rounded-full"
                    />
                    </div>
                </div>
                </div>
            )}
          {!selectedImage && (
            <>
              <button
                type="button"
                onClick={handleButtonClick}
                aria-label="Upload image"
                className="file-input-icon w-[20px] h-[20px] flex justify-center items-center cursor-pointer"
            >
                <HiOutlinePlusCircle className="w-[20px] h-[20px] text-[#2D3648] text-xl" />
            </button>
            <input
                type="file"
                accept="image/*"
                {...register("avatar", {
                required: "სავალდებულოა",
                })}
                ref={(e) => {
                ref(e);
                fileInputRef.current = e;
                }}
                className="hidden"
                onChange={handleFileChange}
            />
            </>
            )}
          
        </div>
        {errors.avatar && (
          <div className="w-full flex justify-start items-center gap-1 font-firago font-normal text-[14px] leading-[16.8px] text-[#F93B1D]">
            <HiMiniCheck className="text-xl" />
            <p>{errors.avatar.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;