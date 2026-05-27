
export const QUERY_REGISTRY = {
  getSession: "get-session",
} as const;

export const MUTATION_REGISTRY = {
  startGame: "start-game",
  syncAnswer: "sync-answer",
  gameResult: "game-result",
} as const;
