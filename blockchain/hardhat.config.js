require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan")


module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {

    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/EHD2gQtDUtW4gM6jJ58QcI13oyVzxEm8",
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
