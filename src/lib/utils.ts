import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Log = (text: string, data: any): void => {
  if (process.env.NODE_ENV === "production") return
  const style = `
    font-size: 16px;
    padding: 4px;
    background-color: blue;
    color: white;
    font-weight: bold;
  `

  console.log(`%c${text}`, style, data)
}


export const constGameProgress = (answerLength: number) => {
  // there alwasy be 25 questoins
  return Math.round((answerLength * 100) / 25); 
}