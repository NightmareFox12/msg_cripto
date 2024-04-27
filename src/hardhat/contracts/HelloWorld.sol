// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract HelloWorld {
  string internal message = "Hello, World!";

  function getGreeting() public view returns (string memory) {
    return message;
  }
}
