export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_TABLELAND_RPC: string
			NEXT_PUBLIC_MUMBAI_RPC: string
			NEXT_PUBLIC_TABLELAND_PRIVATE_KEY: string
			NEXT_PUBLIC_PRIVATE_KEY: string
			NEXT_PUBLIC_RELAY_API: string
			NEXT_PUBLIC_ADDRESS: string
		}
	}
}
