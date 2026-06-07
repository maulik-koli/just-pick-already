import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registery";

import { getSession, getResult } from "@/hooks/api/services";
import { ResultResponse, StartGameResponse } from "@/types/_types";


export const useGetSession = (
    sessionId: string | null,
    options?: QueryOptions<StartGameResponse>,
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getSession, sessionId],
        queryFn: () => getSession(sessionId!),
        enabled: !!sessionId,
        retry: false,
        ...options,
    });
};


export const useGetResult = (
    sessionId: string | null,
    options?: QueryOptions<ResultResponse>,
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.getResult, sessionId],
        queryFn: () => getResult(sessionId!),
        enabled: !!sessionId,
        retry: false,
        ...options,
    });
};
