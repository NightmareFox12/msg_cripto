const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorld", (m) => {
  const helloWorld = m.contract("HelloWorld");
  return { helloWorld };
});