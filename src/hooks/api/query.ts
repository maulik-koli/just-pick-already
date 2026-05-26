import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "@/types/api";
import { QUERY_REGISTRY } from "@/constants/api-registery";

import { getSession } from "./services";
import { StartGameResponse } from "@/app/api/_types";


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
