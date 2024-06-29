const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// Exponential backoff formula: 2^attempt * 1000 (milliseconds)
const exponentialBackoff = (attempt) => {
  return Math.pow(2, attempt) * 1000;
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, 
        `https://sepolia.infura.io/v3/${process.env.INFURA_ENDPOINT}`, {
        //connection to be reused for multiple requests, rather than establishing a new oe
        providerOptions: {
          keepAlive: true,
          confirmations: 10,
          numberOfAddresses: 1,
          //time out to 20sec,prevent from waiting indefinitely
          networkCheckTimeout: 10000,
          timeoutBlocks: 200,
          skipDryRun: true
        },
        clientConfig: {
          maxAttempts: 5,
          //Function to calculate retry interval
          interval: exponentialBackoff
        },
        }
      ),
      network_id: 11155111
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",  
    }
  },
};
