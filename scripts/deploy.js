const {ethers} = require("hardhat");

async function main() {
  const SpaceNFT = await ethers.getContractFactory("SpaceNFT");
  const spaceNFT = await SpaceNFT.deploy();
  console.log("Contract deployed to address: ", spaceNFT.address);
}

main()
  .then(() => process.exit())
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
