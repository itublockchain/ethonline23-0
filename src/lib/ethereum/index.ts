import { ethers } from "ethers"
import { clientConfig } from "@/config"
require("dotenv").config()

const privateKey = process.env.NEXT_PUBLIC_ERC20_SENDER_PRIVATE_KEY;



const provider = new ethers.providers.JsonRpcProvider(
	"https://ethereum-goerli.publicnode.com"
)
const mainAccount = new ethers.Wallet(
	clientConfig.ERC20_SENDER_PRIVATE_KEY,
	provider
)

async function sendGoerliEther(toAddress: string): Promise<void> {
	const tx = {
		to: toAddress,
		value: ethers.utils.parseEther("0.005"),
		gasLimit: 21000,
	}

	const transactionResponse = await mainAccount.sendTransaction(tx)
	await transactionResponse.wait()
}

export { sendGoerliEther }
