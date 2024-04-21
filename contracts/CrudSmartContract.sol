// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CrudSmartContract {
    struct User {
        uint id;
        string name;
    }
    //array of users
    User[] public users;
    uint public nextId;

    function create(string memory name) public {
        users.push(User(nextId, name));
        //option 2. when array is having too many fields: users.push(User({nextId: nextId, name: name}))
        //needing this to add new id user
        nextId++;
    }

    function read(uint id) view public returns(uint, string memory) {
     for (uint i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return(users[i].id, users[i].name);
        }
    }
    revert("User not found");
}
  

    function update(uint id, string memory name) public {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].name = name;
            }
        }
    }

    function deleteId(uint id) public {
        delete users[id];
    }
}
