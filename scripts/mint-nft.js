require('dotenv').config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/SpaceNFT.sol/SpaceNFT.json");

const contractAddress = "0xf328aAbac1d5fE30Ea2085345E5E4b4D36832C6F";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  }

  web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    .then(signedTx => {
      return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    })
    .then(hash => {
      console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
    })
    .catch(err => {
      console.log("Something went wrong when submitting your transaction:", err);
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmQ9yTcEyjQCVFwZEVuQmiMyPztDjkH1LK8zira9pXUbqz");
