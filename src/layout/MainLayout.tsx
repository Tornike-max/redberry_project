import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useRealEstateContext } from "../context/useRealEstateContext";
import Header from "../components/Header";

const MainLayout = () => {
  const { pathname } = useLocation();
  // const { reset } = useRealEstateContext();

  useEffect(() => {
    if (pathname !== "/realEstate/create") {
      localStorage.removeItem("realEstateData");
      localStorage.removeItem("uploadedImage");
      // reset();
    }

    return () => {
      // reset();
    };
  }, [pathname]);

  return (
    <div className="max-w-[1920px] w-full mx-auto bg-[#FFFFFF] min-h-screen flex justify-start items-center flex-col px-[120px]">
        <Header />
        <main className="mt-[100px] w-full flex justify-center items-center h-auto pb-[300px] gap-[20px]">
            <Outlet />
        </main>
    </div>
  );
};

export default MainLayout;