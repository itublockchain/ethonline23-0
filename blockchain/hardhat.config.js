require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")


module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {

    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.DEPLOYER_KEY],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
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
