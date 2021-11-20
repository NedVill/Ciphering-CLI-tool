const { encode } = require("./utils/encode");
const { decode } = require("./utils/decode");
const { validation } = require("./utils/validation");

const caesarCipher = (params) => {
  validation(params);

  const charsArray = params.string.split("");

  if (params.mode === "encode") {
    return encode(charsArray, params.step);
  }

  if (params.mode === "decode") {
    return decode(charsArray, params.step);
  }
};

module.exports.caesarCipher = caesarCipher;
