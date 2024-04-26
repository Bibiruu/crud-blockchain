const CrudSmartContract = require('CrudSmartContract')

contract("CrudSmartContract", () => {
    let crudSmartContract;

    before( async () => {
        crudSmartContract = await CrudSmartContract.deployed()
    })

    
})