const { ethers } = require("hardhat");

async function main() {
  try {
    // Get the deployed contract
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
    const RealEstate = await ethers.getContractFactory("RealEstateContract");
    const contract = await RealEstate.attach(contractAddress);

    // List a test property
    console.log("Listing a test property...");
    const tx = await contract.listProperty(
      "Test House",
      "123 Test Street",
      "https://example.com/image.jpg",
      ethers.utils.parseEther("1"), // 1 ETH
      100 // 100 tokens
    );

    await tx.wait();
    console.log("Property listed successfully!");

    // Get all properties
    const properties = await contract.getAllProperties();
    console.log("All properties:", properties);

  } catch (error) {
    console.error("Test failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  }); 