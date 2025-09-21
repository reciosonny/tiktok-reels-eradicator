import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const mockWaitPromise = (ms?: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms ?? 500));
}

export const PATHS_TO_WATCH = ["/en", "/foryou", "/", "/friends", "/explore", "/following"]; // keep in sync with options page