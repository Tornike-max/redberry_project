import { useQuery } from "@tanstack/react-query"
import { getPriorities } from "../api/api"

export const useGetPriorities = () => {
    const {data,isPending,error} = useQuery({
        queryKey:['priorities'],
        queryFn:getPriorities
    })

    return { data, isPending, error };

}