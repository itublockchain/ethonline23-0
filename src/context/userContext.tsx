import * as React from "react"

import { useToast } from "@/components/ui/use-toast"

export const UserContext = React.createContext<IUserContext | null>(null)

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<User | null>(null)

	const { toast } = useToast()

	React.useEffect(() => {
		setUser(
			window.localStorage.getItem("user")
				? JSON.parse(localStorage.getItem("user") as string)
				: null
		)
	}, [])

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
