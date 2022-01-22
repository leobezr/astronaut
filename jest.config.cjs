const { defaults } = require("jest-config");

module.exports = async () => {
  return {
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
    preset: "ts-jest",
    testEnvironment: "jest-environment-node",
    transform: {},
  };
};
