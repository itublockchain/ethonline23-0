require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");


module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {

    },
    goerli: {
      url: "rpc",
      accounts: ["pk"],
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
