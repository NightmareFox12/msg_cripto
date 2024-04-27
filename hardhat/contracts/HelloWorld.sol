// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloWorld {
    // string public name;
    // string public status;

    // constructor(string memory _name) {
    //     name = _name;
    //     status = "ignition";
    // }

    // function launch() public {
    //     status = "lift-off";
    // }
    string _hello = "Hello, World!";

    function helloWorld() public view returns (string memory) {
      return _hello;
    }
}