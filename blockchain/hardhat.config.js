require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");


module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {

    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/EHD2gQtDUtW4gM6jJ58QcI13oyVzxEm8",
      accounts: ["82e7939157b2d1640f0ab6ae871b1b73152069f35837b000c3c47c54574d610f"],
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
