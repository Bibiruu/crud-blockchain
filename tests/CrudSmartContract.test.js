const CrudSmartContract = artifacts.require('CrudSmartContract')

contract("CrudSmartContract", () => {
    let crudSmartContract = null;

    before(async () => {
        crudSmartContract = await CrudSmartContract.deployed()
    });
    it('should create a new user', async () => {
        await crudSmartContract.create('Joseph');
        //read() also tested
        const user = await crudSmartContract.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Joseph');
    });
    it('should update user', async () => {
        await crudSmartContract.update(1, 'Jose');
        const user = await crudSmartContract.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Jose');
    });
    //revert handling
    it('should not update a non-existing user', async () => {
        try {
            await crudSmartContract.update(2, 'Jo');
        }
        catch (error) {
            assert(error.message.includes('User doesnt exist'));
            return;
        }
        
        assert(false);
    });

});