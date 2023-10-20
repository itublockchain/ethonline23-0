const hre = require("hardhat");

async function main() {
	// Deploy MockBAYC

	console.log("Deploying MockBAYC...");
	const mockBAYC = await hre.ethers.deployContract("MockBAYC");
	console.log("MockBAYC deployed to:", mockBAYC.target);

	// Deploy ApeERC20
	console.log("Deploying ApeERC20...");
	const apeERC20 = await hre.ethers.deployContract("ApeERC20");
	console.log("ApeERC20 deployed to:", apeERC20.target);

	// Deploy MainVault
	console.log("Deploying MainVault...");
	const mainVault = await hre.ethers.deployContract("MainVault", [
		apeERC20.target
	]);
	console.log("MainVault deployed to:", mainVault.target);

	// Deploy RentalContract
	console.log("Deploying RentalContract...");
	const rentalContract = await hre.ethers.deployContract("RentalContract", [
		mockBAYC.target,
		apeERC20.target,
		mainVault.target,
	]);
	console.log("RentalContract deployed to:", rentalContract.target);
}
module.exports.default = main();

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
