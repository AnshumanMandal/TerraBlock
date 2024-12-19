const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstateContract", function () {
  let RealEstate;
  let realEstate;
  let owner;
  let buyer;

  beforeEach(async function () {
    // Get signers (accounts)
    [owner, buyer] = await ethers.getSigners();

    // Deploy contract
    RealEstate = await ethers.getContractFactory("RealEstateContract");
    realEstate = await RealEstate.deploy();
    await realEstate.deployed();
  });

  describe("Listing Property", function () {
    it("Should list a new property", async function () {
      const tx = await realEstate.listProperty(
        "Test Property",
        "Test Location",
        "test.jpg",
        ethers.utils.parseEther("1"),
        100
      );

      await tx.wait();

      const property = await realEstate.properties(1);
      expect(property.name).to.equal("Test Property");
      expect(property.isAvailable).to.equal(true);
    });
  });

  describe("Purchasing Tokens", function () {
    beforeEach(async function () {
      // List a property first
      await realEstate.listProperty(
        "Test Property",
        "Test Location",
        "test.jpg",
        ethers.utils.parseEther("1"),
        100
      );
    });

    it("Should allow buying tokens", async function () {
      const tokensToBuy = 10;
      const property = await realEstate.properties(1);
      const tokenPrice = property.tokenPrice;

      await realEstate.connect(buyer).purchaseTokens(1, tokensToBuy, {
        value: tokenPrice.mul(tokensToBuy)
      });

      const buyerTokens = await realEstate.getMyTokens(1);
      expect(buyerTokens).to.equal(tokensToBuy);
    });
  });
}); 