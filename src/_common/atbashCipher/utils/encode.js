const { checkIsLetter } = require("../../../utils/check-is-letter");
const { checkIsLatin } = require("../../../utils/check-is-latin");
const {
  englishAlphabetLength,
  firstLetterNum,
} = require("../../../constants/constants");

const encode = (mainArr) => {
  if (mainArr === undefined) {
    return "";
  }

  if (!Array.isArray(mainArr)) {
    return "";
  }

  return mainArr
    .map((char) => {
      if (!checkIsLetter(char) || !checkIsLatin(char)) {
        return char;
      }

      const isUpper = char.toUpperCase() === char;

      let currentChar = char.toLowerCase().charCodeAt() - firstLetterNum + 1;
      let resultChar = String.fromCharCode(
        englishAlphabetLength - currentChar + firstLetterNum
      );

      return isUpper ? resultChar.toUpperCase() : resultChar;
    })
    .join("");
};

module.exports.encode = encode;
