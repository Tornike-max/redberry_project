import React from "react";

const SecondaryButton = ({
  onClick,
  children,
  size,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <button
      type="button"
      className={`rounded-[10px] ${
        size === "md"
          ? "h-[47px] py-[10px] px-[16px]"
          : size === "lg"
          ? "py-[12px] px-[16px]"
          : "py-[10px] px-[16px]"
      } border-[1px] border-[#F93B1D] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-[#FFFFFF] text-[16px] leading-[19.2px] font-firago font-medium text-center  duration-200 transition-all ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;