import { useMutation } from "@tanstack/react-query";
import { MutationOptions } from "@/types/api";
import { MUTATION_REGISTRY } from "@/constants/api-registery";

import { gameResult, sendEmail, startGame, syncAnswer } from "@/hooks/api/services";
import { ResultCreateResponse, ResultResponse, SendEmailResponse, StartGamePayload, StartGameResponse, UpdateAnswerPayload, UpdateAnswerResponse } from "@/types/_types";
import { ContactFormType } from "@/schemas/contact.schema";


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
  options?: MutationOptions<ResultCreateResponse, string>,
) => {
  return useMutation({
    mutationKey: [MUTATION_REGISTRY.gameResult],
    mutationFn: (sessionId: string) => gameResult(sessionId),
    
    ...options,
  });
};

export const useSendEmail = (
  options?: MutationOptions<SendEmailResponse, ContactFormType>,
) => {
  return useMutation({
    mutationKey: [MUTATION_REGISTRY.gameResult],
    mutationFn: (payload) => sendEmail(payload),
    ...options,
  });
};
