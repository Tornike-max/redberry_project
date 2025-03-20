import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../api/api";

export const useGetDepartments = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  return { data, isPending, error };
};