// Hardhat v2 plugin that injects `hre.ethers` (ethers v5). Required for deploy scripts using `hre.ethers.getSigners()` and `counter.deployed()`.
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
