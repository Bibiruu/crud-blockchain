const CrudSmartContract = artifacts.require("CrudSmartContract");

module.exports = function(deployer) {
  deployer.deploy(CrudSmartContract);
};
