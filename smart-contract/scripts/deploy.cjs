const { ethers } = require("hardhat");

async function main() {
  try {
    // Get the contract factory
    const RealEstate = await ethers.getContractFactory("RealEstateContract");
    
    // Deploy the contract
    console.log("Deploying RealEstateContract...");
    const realEstate = await RealEstate.deploy();
    
    // Wait for deployment to finish
    await realEstate.deployed();
    
    // Log the contract address
    console.log("RealEstateContract deployed to:", realEstate.address);

    // Save the contract address to a file
    const fs = require("fs");
    const path = require("path");
    
    // Create a config file with the contract address
    fs.writeFileSync(
      path.join(__dirname, "../src/config.js"),
      `export const CONTRACT_ADDRESS = "${realEstate.address}";\nexport const NETWORK_ID = "31337";`
    );

    console.log("Contract address saved to config file!");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 