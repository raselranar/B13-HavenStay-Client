import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const timeFormat = (time) => {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
