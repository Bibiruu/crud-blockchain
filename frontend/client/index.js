import Web3 from 'web3';
import CrudSmartContract from '../build/contracts/CrudSmartContract.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      //user authorizing metamask
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if (typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(CrudSmartContract.networks)[0];
  return new web3.eth.Contract(
    CrudSmartContract.abi,
    CrudSmartContract
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  let accounts = [];

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  $create.addEventListener('submit', error => {
    error.preventDefault();
    const name = e.target.elements[0].value;
    crud.methods
      .create(name)
      .send({ from: accounts[0]})
      .then(() => {
        $createResult.innerHTML = `New user ${name} was sucessfully created`;
      })
      .catch(() => {
        $createResult.innerHTML = `Oops, theres was an error while trying to create a new user`;
      });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp();
    })
    .catch(error => console.log(error.message));
});
