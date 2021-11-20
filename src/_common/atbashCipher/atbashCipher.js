const { encode } = require("./utils/encode");

const atbashCipher = (string) => {
  if (typeof string !== "string") {
    throw new Error("Incorrect! You should to pass a string parameter");
  }

  const charsArray = string.split("");

  return encode(charsArray);
};

module.exports.atbashCipher = atbashCipher;
