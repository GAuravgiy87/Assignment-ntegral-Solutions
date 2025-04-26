import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const startYear = startDate.getFullYear();
  
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const endYear = endDate.getFullYear();
  
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
  }
  
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export function getFormattedTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
