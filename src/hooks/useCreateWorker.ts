import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorker } from "../api/api";
import { CreateWorkerInterface } from "../types/types";

export const useStoreWorker = () => {
  const queryClient = useQueryClient();
  const { mutate: storeWorker, isPending } = useMutation({
    mutationFn: (data: CreateWorkerInterface) => createWorker(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
    onError: () => {
      throw new Error("Failed to store worker");
    },
  });

  return { storeWorker, isPending };
};