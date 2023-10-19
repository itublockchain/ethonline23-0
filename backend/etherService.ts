import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const privateKey = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(
	"https://ethereum-goerli.publicnode.com"
);
const mainAccount = new ethers.Wallet("82e7939157b2d1640f0ab6ae871b1b73152069f35837b000c3c47c54574d610f", provider);

async function sendGoerliEther(toAddress: string): Promise<void> {
	const tx = {
		to: toAddress,
		value: ethers.utils.parseEther("0.005"),
		gasLimit: 21000,
	};

	const transactionResponse = await mainAccount.sendTransaction(tx);
	await transactionResponse.wait();
}

export { sendGoerliEther };
