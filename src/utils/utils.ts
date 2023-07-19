import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  theme:{
    maxWidth:["half"]
  }
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}