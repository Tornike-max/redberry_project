const Button = ({
    isPending,
    type,
    children,
    size,
    onClick,
  }: {
    isPending?: boolean;
    type: "reset" | "submit" | "button";
    children: React.ReactNode;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
  }) => {
    return (
      <button
        type={type}
        className={`h-[47px] rounded-[10px]  border-[1px] text-[#FFFFFF] bg-[#F93B1D] hover:bg-[#DF3014] border-[#F93B1D] px-[16px] py-[10px] gap-[2px] font-firago font-medium flex items-center justify-center ${
          size === "sm"
            ? "w-[203px]"
            : size === "md"
            ? "w-[230px]"
            : size === "lg"
            ? "w-[250px]"
            : ""
        } `}
        disabled={isPending}
        onClick={onClick ? onClick : undefined}
      >
        {children}
      </button>
    );
  };
  
  export default Button;