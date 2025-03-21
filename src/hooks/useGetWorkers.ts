import { useQuery } from "@tanstack/react-query"
import { getWorkers } from "../api/api"

export const useGetWorkers = () => {
    const {data,isPending,error} = useQuery({
        queryKey:['workers'],
        queryFn:getWorkers
    })

    return {data,isPending,error}
}