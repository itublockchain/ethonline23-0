import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy MockBAYC
    const MockBAYC = await ethers.getContractFactory("MockBAYC");
    const mockBAYC = await MockBAYC.deploy();
    await mockBAYC.deployed();
    console.log("MockBAYC deployed to:", mockBAYC.address);

    // Deploy ApeERC20
    const ApeERC20 = await ethers.getContractFactory("ApeERC20");
    const apeERC20 = await ApeERC20.deploy();
    await apeERC20.deployed();
    console.log("ApeERC20 deployed to:", apeERC20.address);

    // Deploy MainVault
    const MainVault = await ethers.getContractFactory("MainVault");
    const mainVault = await MainVault.deploy(apeERC20.address, deployer.address); // Assuming deployer address is the donation address
    await mainVault.deployed();
    console.log("MainVault deployed to:", mainVault.address);

    // Deploy RentalContract
    const RentalContract = await ethers.getContractFactory("Rental");
    const rentalContract = await RentalContract.deploy(mockBAYC.address, apeERC20.address, mainVault.address);
    await rentalContract.deployed();
    console.log("RentalContract deployed to:", rentalContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
