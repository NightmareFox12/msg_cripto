const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorld", (m) => {
  const HelloWorld = m.contract("HelloWorld", [],{});
  return { HelloWorld };
});