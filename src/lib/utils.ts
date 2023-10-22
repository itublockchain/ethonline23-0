import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const shortHandData = (
	address: string,
	prefixLength = 5,
	suffixLength = 5
) => {
	console.log(address)
	if (!address) return ""
	return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
}
