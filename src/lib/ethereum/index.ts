import { ethers } from "ethers"
import { clientConfig } from "@/config"
require("dotenv").config()
const contractInfoApeERC20: ContractInfo = require("../../constants/ApeERC20-contractInfo.json")
const contractInfoMockBAYC: ContractInfo = require("../../constants/MockBAYC-contractInfo.json")

interface ContractInfo {
	0: string
	1: any[]
}

const privateKey = process.env.NEXT_PUBLIC_ERC20_SENDER_PRIVATE_KEY

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

const CONTRACT_ADDRESS_ApeERC20 = contractInfoApeERC20[0]
const CONTRACT_ABI_ApeERC20 = contractInfoApeERC20[1]

const apeMintContract = new ethers.Contract(
	CONTRACT_ADDRESS_ApeERC20,
	CONTRACT_ABI_ApeERC20,
	mainAccount
)

async function mintApeCoin(toAddress: string, amount: string): Promise<void> {
	const amountToMint = ethers.utils.parseUnits(amount, 18)
	const transactionResponse = await apeMintContract.mint(
		toAddress,
		amountToMint
	)
	await transactionResponse.wait()
}

const CONTRACT_ADDRESS_MockBAYC = contractInfoMockBAYC[0]
const CONTRACT_ABI_MockBAYC = contractInfoMockBAYC[1]

const mockBAYCContract = new ethers.Contract(
	CONTRACT_ADDRESS_MockBAYC,
	CONTRACT_ABI_MockBAYC,
	mainAccount
)

async function mintMockBAYC(toAddress: string, amount: string): Promise<void> {
	const amountToMint = 1
	const transactionResponse = await mockBAYCContract.mint(
		mainAccount.address,
		amountToMint
	)
	await transactionResponse.wait()
}

async function getApeCoinBalance(address: string): Promise<string> {
	const balance = await apeMintContract.balanceOf(address)
	return Number(balance).toString()
}

export { sendGoerliEther, mintApeCoin, mintMockBAYC, getApeCoinBalance }
