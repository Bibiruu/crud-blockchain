// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CrudSmartContract {
    struct User {
        uint id;
        string name;
    }
    //array of users
    User[] public users;
    uint public nextId = 1;

    function create(string memory name) public {
        users.push(User(nextId, name));
        //option 2. when array is having too many fields(key-value pair): users.push(User({nextId: nextId, name: name}))
        //needing this to add new id user
        nextId++;
    }

    function read(uint id) public view returns (uint, string memory) {
        //find the position in the user array
        uint i = find(id);
        return (users[i].id, users[i].name);
    }

    function update(uint id, string memory name) public {
        uint i = find(id);
        users[i].name = name;
    }

    function deleteId(uint id) public {
        uint i = find(id);
        delete users[i];
    }

    //position of the user struct in the users array
    function find(uint id) internal view returns (uint) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                return i;
            }
        }
        revert("User doesnt exist");
    }

    function showAll() public view returns (string memory) {
        string memory allNames;

        for (uint i = 0; i < users.length; i++) {
            if (bytes(users[i].name).length > 0) {
                // Check if the name is not empty
                if (bytes(allNames).length > 0) {
                    allNames = string(
                        abi.encodePacked(allNames, ", ", users[i].name)
                    );
                } else {
                    allNames = users[i].name;
                }
            }
        }
        return allNames;
    }
}
