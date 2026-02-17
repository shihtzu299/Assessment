const hre = require("hardhat");

async function main() {
  // Hardhat v2 + ethers v5 exposes ethers via hre.ethers (plugin)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Counter with account:", deployer.address);

  // Get contract factory and deploy the Counter contract
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  /**
   * IMPORTANT:
   * This project uses ethers v5, so we wait for deployment with `deployed()`.
   * (ethers v6 would use `waitForDeployment()` and `getAddress()` instead.)
   */
  await counter.deployed();

  // In ethers v5, the deployed address is available as `counter.address`
  console.log("Counter deployed to:", counter.address);
  console.log("Save this address for the backend/frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
