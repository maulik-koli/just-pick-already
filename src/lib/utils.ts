import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const constGameProgress = (answerLength: number) => {
  // there alwasy be 25 questoins
  return Math.round((answerLength * 100) / 25); 
}