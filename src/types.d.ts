type User = {
	email: string
	name: string
	profileImage: string
	aggregateVerifier: string
	verifier: string
	verifierId: string
	typeOfLogin: any
	dappShare?: string
	/**
	 * Token issued by Web3Auth.
	 */
	idToken?: string
	/**
	 * Token issued by OAuth provider. Will be available only if you are using
	 * custom verifiers.
	 */
	oAuthIdToken?: string
	/**
	 * Access Token issued by OAuth provider. Will be available only if you are using
	 * custom verifiers.
	 */
	oAuthAccessToken?: string
}

type Wallet = {
	eoa?: string
	safes?: string[]
}

type IWalletContext = {
	wallet: Wallet | null
	setWallet: (wallet: Wallet | null) => void
}

interface IUserContext {
	user: Partial<User> | null
	setUser: (user: User | null) => void
}
