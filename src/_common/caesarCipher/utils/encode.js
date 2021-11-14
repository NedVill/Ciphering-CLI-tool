const { checkIsLetter } = require("../../../utils/check-is-letter");
const { checkIsLatin } = require("../../../utils/check-is-latin");
const {
  englishAlphabetLength,
  firstLetterNum,
} = require("../../../constants/constants");

const encode = (mainArr, step = 3) =>
  mainArr
    .map((char) => {
      if (!checkIsLetter(char) || !checkIsLatin(char)) {
        return char;
      }

      const isUpper = char.toUpperCase() === char;

      let currentChar = char.toLowerCase().charCodeAt() - firstLetterNum;
      let increasedChar = currentChar + step;

      if (increasedChar >= englishAlphabetLength) {
        increasedChar = englishAlphabetLength - increasedChar;
      }

      increasedChar = String.fromCharCode(
        Math.abs(increasedChar) + firstLetterNum
      );

      return isUpper ? increasedChar.toUpperCase() : increasedChar;
    })
    .join("");

module.exports.encode = encode;
