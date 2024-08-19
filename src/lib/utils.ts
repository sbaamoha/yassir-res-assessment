import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const switchDateFormat = (date: string) => {
  const dateParts = date.split(".");
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

  return formattedDate;
};
