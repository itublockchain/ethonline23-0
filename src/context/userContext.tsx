import * as React from "react"

export const UserContext = React.createContext<IUserContext | null>(null)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<User | null>(null)
	const [connected, setConnected] = React.useState<boolean>(
		window.localStorage.getItem("connected")
			? JSON.parse(localStorage.getItem("connected") as string)
			: false
	)

	React.useEffect(() => {
		if (user && !connected) {
			setConnected(true)
			window.localStorage.setItem("connected", JSON.stringify(true))
		} else if (!user && connected) {
			setConnected(false)
			window.localStorage.setItem("connected", JSON.stringify(false))
		}
	}, [connected, user])

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				connected,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
