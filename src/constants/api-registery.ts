
export const QUERY_REGISTRY = {
  getSession: "get-session",
  getResult: "get-result"
} as const;

export const MUTATION_REGISTRY = {
  startGame: "start-game",
  syncAnswer: "sync-answer",
  gameResult: "game-result",
  sendEmail: "send-email",
} as const;
