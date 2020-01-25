module.exports = {
  extends: ["airbnb-base"],
  parser: "babel-eslint",
  env: {
    mocha: true
  },
  rules: {
    "no-restricted-globals": "off",
    "consistent-return": "off"
  }
};
