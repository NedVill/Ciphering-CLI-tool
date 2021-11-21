const { encode } = require("./utils/encode");
const { decode } = require("./utils/decode");

const caesarCipher = (params) => {
  if (typeof params !== "object") {
    throw new Error("you need enter an object of params");
  }

  if (!params.string) {
    throw new Error("you need to enter a string value");
  }

  if (!params.mode) {
    throw new Error("you need to enter a mode");
  }

  if (params.mode !== "encode" && params.mode !== "decode") {
    throw new Error(
      "you need to enter a mode with params: 'encode' or 'decode'"
    );
  }

  if (typeof params.mode !== "string" || typeof params.string !== "string") {
    throw new Error("you need to enter params with type - string");
  }

  const charsArray = params.string.split("");

  if (params.mode === "encode") {
    return encode(charsArray, params.step);
  }

  if (params.mode === "decode") {
    return decode(charsArray, params.step);
  }

  return params.string;
};

module.exports.caesarCipher = caesarCipher;
