const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MessagingApp", (m) => {
  const MessagingApp = m.contract("MessagingApp", [],{});
  return { MessagingApp };
});