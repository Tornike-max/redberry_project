import FilterSection from "../components/HomePageComponents/FilterSection";

const HomePage = () => {
  return (
    <div className="w-full">
      <h1 className="text-[34px] text-[#8dc3f9] mt-10 w-full text-start">დავალებების გვერდი</h1>
      <div className="w-[700px] border-[#DBDBDB] rounded-[10px] p-[6px] border-[1px] flex items-center gap-4 justify-start z-30 mt-[40px]">
        <FilterSection />
      </div>
    </div>
  );
};

export default HomePage;