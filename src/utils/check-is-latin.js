const { latinRegex } = require("../constants/constants");

const checkIsLatin = (char) => {
  return latinRegex.test(char);
};

module.exports.checkIsLatin = checkIsLatin;
