import { api } from "@/lib/axios";
import { StartGamePayload, StartGameResponse, UpdateAnswerPayload, UpdateAnswerResponse } from "@/app/api/_types";


export const startGame = async (payload: StartGamePayload): Promise<StartGameResponse> => {
  const response = await api.post("/start", payload);
  return response.data;
};

export const getSession = async (sessionId: string): Promise<StartGameResponse> => {
  const response = await api.get(`/session/${sessionId}`);
  return response.data;
};

export const syncAnswer = async (payload: UpdateAnswerPayload): Promise<UpdateAnswerResponse> => {
  const response = await api.post(`/session/${payload.sessionId}/answers`, payload.data);
  return response.data;
};
