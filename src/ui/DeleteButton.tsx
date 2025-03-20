const DeleteButton = ({
    setIsOpen,
  }: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const handleConfirmDeletion = () => {
      setIsOpen(true);
    };
  
    return (
      <div className="w-full flex justify-start items-center">
        <button
          onClick={handleConfirmDeletion}
          className="w-[170px] text-[14px] text-[#808A93] hover:bg-[#808A93] hover:text-[#FFFFFF] h-[37px] mt-[14px] rounded-[8px] border-[1px] p-[10px] text-center leading-[16.8px] font-firago font-medium duration-150 transition-all ease-in-out"
        >
          ლისტინგის წაშლა
        </button>
      </div>
    );
  };
  
  export default DeleteButton;