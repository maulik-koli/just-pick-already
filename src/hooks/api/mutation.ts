import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/api-registery";

import { gameResult, startGame, syncAnswer } from "./services";
import { ResultResponse, StartGamePayload, StartGameResponse, UpdateAnswerPayload, UpdateAnswerResponse } from "@/app/api/_types";


export const useStartGame = (
  options?: MutationOptions<StartGameResponse, StartGamePayload>,
) => {
  return useMutation({
    mutationKey: [MUTATION_REGISTRY.startGame],
    mutationFn: (payload) => startGame(payload),
    ...options,
  });
};

export const useSyncAnswer = (
  options?: MutationOptions<UpdateAnswerResponse, UpdateAnswerPayload>,
) => {
  return useMutation({
    mutationKey: [MUTATION_REGISTRY.syncAnswer],
    mutationFn: (payload) => syncAnswer(payload),
    ...options,
  });
};

export const useGameResult = (
  options?: MutationOptions<ResultResponse, string>,
) => {
  return useMutation({
    mutationKey: [MUTATION_REGISTRY.gameResult],
    mutationFn: (sessionId: string) => gameResult(sessionId),
    ...options,
  });
};
