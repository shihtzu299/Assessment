const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Counter with account:", deployer.address);

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();

  const address = await counter.getAddress();
  console.log("Counter deployed to:", address);
  console.log("Save this address for the frontend (e.g. NEXT_PUBLIC_CONTRACT_ADDRESS).");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
