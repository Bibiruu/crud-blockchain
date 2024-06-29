import Web3 from 'web3';
import CrudSmartContract from '../../build/contracts/CrudSmartContract.json';

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
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');

  //getting account from metamask
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
      .send({ from: accounts[0] })
      .then(() => {
        $createResult.innerHTML = `New user ${name} was sucessfully created`;
      })
      .catch(_e => {
        $createResult.innerHTML = `Oops, theres was an error while trying to create a new user`;
      });
  });

  $read.addEventListener('submit', error => {
    error.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .read(id)
      .call()
      .then(result => {
        $readResult.innerHTML = `Id: ${result[0]} Name: ${result[1]}`;
      })
      .catch(_e => {
        $readResult.innerHTML = `Oops, theres was an problem while 
        trying to read user ${id}`;
      });
  });

  $edit.addEventListener('submit', error => {
    error.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    crud.methods
      .update(id, name)
      .send({ from: accounts[0] })
      .then(() => {
        $editResult.innerHTML = `Changed name of user ${id} to
        ${name}`;
      })
      .catch(_e => {
        $editResult.innerHTML = `Oops, theres was an error 
        while trying to update user ${id} to ${name}`;
      });
  });

  $delete.addEventListener('submit', error => {
    error.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
      .deleteId(id)
      .send({ from: accounts[0] })
      .then(() => {
        $deleteResult.innerHTML = `Deleted user ${id}`;
      })
      .catch(_e => {
        $deleteResult.innerHTML = `Oops, there was an error while trying
        to delete user ${id}`;
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
