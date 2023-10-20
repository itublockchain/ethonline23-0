import { z } from "zod"

// Read environment variables using process.env.ENV_VAR only from this file.
// See Next.js docs for environment variables:
//   https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
// Environment variables starting with NEXT_PUBLIC_ are available in the browser and the server
//   making them publicly available.
// Environment variables not starting with NEXT_PUBLIC_ are available in the server only
//   making them suitable to store secrets such as API keys.
// This module exports publicConfig and serverConfig to clearly distinguish between these
//   two types of variables . Both of these objects are valiadated with Zod.
// To "store config in the environment" (See https://12factor.net/config):
//   1. Edit this file
//   2. Use restrictive validations. process.env.ENV_VAR always returns strings, therefore use:
//      * https://github.com/colinhacks/zod#strings
//   3. If required, convert process.env.ENV_VAR variables to other types and validate them.
//   4. Add extensive documentation in Zod files.

const ServerConfig = z.object({
	PRIVATE_KEY: z.string(),
})

const ClientConfig = z.object({
	TABLELAND_RPC: z.string().url(),
	MUMBAI_RPC: z.string().url(),
	TABLELAND_PRIVATE_KEY: z.string(),
	RELAY_API: z.string(),
	ERC20_SENDER_PRIVATE_KEY: z.string(),
})

const clientConfig = ClientConfig.parse({
	TABLELAND_RPC: process.env.NEXT_PUBLIC_TABLELAND_RPC!,
	MUMBAI_RPC: process.env.NEXT_PUBLIC_MUMBAI_RPC!,
	TABLELAND_PRIVATE_KEY: process.env.NEXT_PUBLIC_TABLELAND_PRIVATE_KEY!,
	RELAY_API: process.env.NEXT_PUBLIC_RELAY_API!,
	ERC20_SENDER_PRIVATE_KEY: process.env.NEXT_PUBLIC_ERC20_SENDER_PRIVATE_KEY!,
})

const isServer = typeof window === "undefined"

let serverConfig: z.infer<typeof ServerConfig>

if (isServer) {
	serverConfig = ServerConfig.parse({
		PRIVATE_KEY: process.env.PRIVATE_KEY!,
	})
}

export { isServer, serverConfig, clientConfig }
