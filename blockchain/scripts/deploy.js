import { AddressZero } from "@biconomy/common";
import { ethers } from "hardhat";

async function deployContracts() {

	/*
		************************
		* deploy MockERC20.sol *
		************************
	*/
	const mockERC20 = await ethers.deployContract("MockERC20");
	await mockERC20.waitForDeployment();

	console.log(`MockERC20 contract deployed to ${mockERC20.target}`);

	/*
		*************************
		* deploy MockOracle.sol *
		*************************
	*/

	const mockOracle = await ethers.deployContract("MockOracle");
	await mockOracle.waitForDeployment();

	console.log(`MockOracle contract deployed to ${mockOracle.target}`);

	return { mockERC20, mockOracle };
}

async function deployVaultWithDependencies() {

	/*
		********************
		* deploy Vault.sol *
		********************
	*/
	const { mockERC20, mockOracle } = await deployContracts();

	const apeCoinAddress = mockERC20.target;
    // TODO: fix donation address
	const donationAddress = AddressZero;
	const args = [apeCoinAddress, donationAddress];

	const vault = await ethers.deployContract("Vault", args);
	await vault.waitForDeployment();

	console.log(`Vault contract deployed to ${vault.target}`);
}

deployVaultWithDependencies().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
