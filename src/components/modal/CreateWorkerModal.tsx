import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import SecondaryButton from "../../ui/SecondaryButton";
import { CreateWorkerInterface } from "../../types/types";
import NameSurnameInputs from "./NameSurnameInputs";
import UploadImage from "./UploadImage";
import DepartmentsSelect from "./DepartmentsSelect";
import { useStoreWorker } from "../../hooks/useCreateWorker";

const CreateWorkerModal = ({
  setIsWorkerModalOpen,
}: {
  setIsWorkerModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<CreateWorkerInterface>({ mode: "onChange" });
  const {storeWorker,isPending} = useStoreWorker();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      setIsWorkerModalOpen(false);
    }
  };

  const onSubmit: SubmitHandler<CreateWorkerInterface> = (data) => {
    const validData = { ...data, avatar: selectedImage };
    console.log(validData);
    storeWorker(validData)
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-[900px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end items-center mb-8">
            <button
            className="absolute top-4 right-4 w-[24px] h-[24px] m-auto text-center rounded-full bg-[#DEE2E6] text-white cursor-pointer"
            onClick={() => setIsWorkerModalOpen(false)}
            >
            X
            </button>
        </div>

        <h3 className="font-medium text-xl text-[32px] text-[#212529] text-center mb-6">
          თანამშრომლის დამატება
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <NameSurnameInputs register={register} trigger={trigger} watch={watch} errors={errors}/>
          <UploadImage register={register} errors={errors} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <DepartmentsSelect register={register} trigger={trigger} errors={errors}/>
          <div className="flex justify-end gap-3 mt-4">
            <SecondaryButton onClick={() => setIsWorkerModalOpen(false)}>
              გაუქმება
            </SecondaryButton>
            <Button type="submit" isPending={isPending}>{isPending ? 'დაელოდეთ...' : "დაამატე თანამშრომელი"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkerModal;
