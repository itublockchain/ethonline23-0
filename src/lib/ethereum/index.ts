import { ethers } from "ethers";
import { clientConfig } from "@/config";
require("dotenv").config();
const contractInfoApeERC20: ContractInfo = require("../../constants/ApeERC20-contractInfo.json");

interface ContractInfo {
	0: string;
	1: any[];
}

const privateKey = process.env.NEXT_PUBLIC_ERC20_SENDER_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
	"https://ethereum-goerli.publicnode.com"
);
const mainAccount = new ethers.Wallet(
	clientConfig.ERC20_SENDER_PRIVATE_KEY,
	provider
);

async function sendGoerliEther(toAddress: string): Promise<void> {
	const tx = {
		to: toAddress,
		value: ethers.utils.parseEther("0.005"),
		gasLimit: 21000,
	};

	const transactionResponse = await mainAccount.sendTransaction(tx);
	await transactionResponse.wait();
}

const CONTRACT_ADDRESS = contractInfoApeERC20[0];
const CONTRACT_ABI = contractInfoApeERC20[1];

const apeMintContract = new ethers.Contract(
	CONTRACT_ADDRESS,
	CONTRACT_ABI,
	mainAccount
);

async function mintApeCoin(toAddress: string, amount: string): Promise<void> {
	const amountToMint = ethers.utils.parseUnits(amount, 18);
	const transactionResponse = await apeMintContract.mint(
		toAddress,
		amountToMint
	);
	await transactionResponse.wait();
}

export { sendGoerliEther, mintApeCoin };
