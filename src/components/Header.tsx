import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = ()=>{

  }

  const simpleCall = ()=>{
    console.log("Simple Call")
  };
  return (
    <header className="fixed w-full h-[100px] border-b-[1px] bg-[#FFFFFF] border-[#DBDBDB] flex items-center justify-start z-50">
      <div className="px-[162px] w-full flex justify-start m-auto items-center ">
        <img
          onClick={() => navigate("/")}
          src={"/logo/logo.png"}
          alt="Logo"
          className="w-[150px] h-[24px] cursor-pointer"
        />
      </div>
    <div className="max-w-[550px] w-full flex justify-center items-center gap-4">
      <button onClick={simpleCall} className="py-1 px-3 border border-[#8338EC] hover:bg-slate-50 text-[16px] text-[#212529] w-[225px] text-center text-[#8338EC] rounded-lg m-auto font-medium cursor-pointer">
            თანამშრომლის შექმნა
      </button>  
      <button onClick={handleNavigate} className="py-1 px-3 bg-[#8338EC] border border-[#8338EC] hover:bg-slate-50 text-[16px] text-[#FFFFFF] w-[268px] text-center text-[#8338EC] rounded-lg m-auto font-medium cursor-pointer">
           + თანამშრომლის შექმნა
      </button>      
    </div>
    </header>
  );
};

export default Header;