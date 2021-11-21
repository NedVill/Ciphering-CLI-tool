const { encode } = require("./utils/encode");
const { decode } = require("./utils/decode");

const caesarCipher = (params) => {
  if (typeof params !== "object") {
    return "you need enter an object of params";
  }

  if (!params.string) {
    return "you need to enter a string value";
  }

  if (!params.mode) {
    return "you need to enter a mode";
  }

  const charsArray = params.string.split("");

  if (params.mode === "encode") {
    return encode(charsArray, params.step);
  }

  if (params.mode === "decode") {
    return decode(charsArray, params.step);
  }
};

module.exports.caesarCipher = caesarCipher;
