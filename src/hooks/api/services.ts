import { api } from "@/lib/axios";
import { ResultCreateResponse, ResultResponse, SendEmailResponse, StartGamePayload, StartGameResponse, UpdateAnswerPayload, UpdateAnswerResponse } from "@/types/_types";
import { ContactFormType } from "@/schemas/contact.schema";


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

export const gameResult = async (sessionId: string): Promise<ResultCreateResponse> => {
  const response = await api.post(`/session/${sessionId}/result`, undefined);
  return response.data;
};

export const getResult = async (sessionId: string): Promise<ResultResponse> => {
  const response = await api.get(`/session/${sessionId}/result`);
  return response.data;
};

export const sendEmail = async (payload: ContactFormType): Promise<SendEmailResponse> => {
  const response = await api.post(`/contact`, payload);
  return response.data;
};
