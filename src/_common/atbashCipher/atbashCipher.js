const { encode } = require("./utils/encode");

const atbashCipher = (string) => {
  const charsArray = string.split("");

  return encode(charsArray);
};

module.exports.atbashCipher = atbashCipher;
