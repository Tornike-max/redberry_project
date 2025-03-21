import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateWorketModal from "./modal/CreateWorkerModal";

const Header = () => {
  const navigate = useNavigate();
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);


  const handleNavigate = () => {
    // Navigation logic here
  };

  const simpleCall = () => {
    console.log("Simple Call");
  };

  const handleOpenAgentModal = () => {
    setIsWorkerModalOpen(true);
  };

  return (
    <>
    <header className="fixed w-full h-[100px] bg-[#FFFFFF] flex items-center justify-between z-50 px-[120px]">
      <div className="w-full flex justify-start items-center">
        <img
          onClick={() => navigate("/")}
          src={"../logo.png"}
          alt="Logo"
          className="w-[150px] h-[24px] cursor-pointer"
        />
      </div>
      <div className="max-w-[550px] w-full flex justify-center items-center gap-4">
        <button
          onClick={handleOpenAgentModal}
          className="py-1 px-3 border border-[#8338EC] hover:bg-slate-50 text-[16px] text-[#212529] w-[225px] text-center rounded-lg font-medium cursor-pointer"
        >
          თანამშრომლის შექმნა
        </button>
        <button
          onClick={handleNavigate}
          className="py-1 px-3 bg-[#8338EC] border border-[#8338EC] hover:bg-slate-50 text-[16px] text-[#FFFFFF] w-[268px] text-center rounded-lg font-medium cursor-pointer"
        >
          + თანამშრომლის შექმნა
        </button>
      </div>
    </header>
      {isWorkerModalOpen && (
        <CreateWorketModal setIsWorkerModalOpen={setIsWorkerModalOpen} />
      )}
    </>
  );
};

export default Header;