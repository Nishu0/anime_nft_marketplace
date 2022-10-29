const fs = require('fs');

require('@nomiclabs/hardhat-waffle');

//add your metamask privateKey in .secret file
const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey],
    },
    // rinkeby: {
    // url: 'https://rinkeby.infura.io/v3/bed4fdcc76bb4978a9a3103ef0946f64',
    //   accounts: [privateKey],
    // },
  },
  solidity: '0.8.4',
};
