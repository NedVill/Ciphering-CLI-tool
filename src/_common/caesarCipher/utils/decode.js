const { checkIsLetter } = require("../../../utils/check-is-letter");
const { checkIsLatin } = require("../../../utils/check-is-latin");
const {
  englishAlphabetLength,
  firstLetterNum,
} = require("../../../constants/constants");

const decode = (mainArr, step = 3) =>
  mainArr
    .map((char) => {
      if (!checkIsLetter(char) || !checkIsLatin(char)) {
        return char;
      }

      const isUpper = char.toUpperCase() === char;

      let currentChar = char.toLowerCase().charCodeAt() - firstLetterNum;
      let decreasedChar = currentChar - step;

      if (decreasedChar < 0) {
        decreasedChar = englishAlphabetLength + decreasedChar;
      }

      decreasedChar = String.fromCharCode(decreasedChar + firstLetterNum);

      return isUpper ? decreasedChar.toUpperCase() : decreasedChar;
    })
    .join("");

module.exports.decode = decode;
