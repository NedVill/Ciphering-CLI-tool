const { caesarCipher } = require("../../_common/caesarCipher/caesarCipher");
const { atbashCipher } = require("../../_common/atbashCipher/atbashCipher");

const runEncode = (method, mode, string) => {
  const currentMode = !!parseFloat(mode) ? "encode" : "decode";
  switch (method) {
    case "C":
      return caesarCipher({
        string,
        mode: currentMode,
        step: 1,
      });
    case "A":
      return atbashCipher(string);
    case "R":
      return caesarCipher({
        string,
        mode: currentMode,
        step: 8,
      });
  }
};

module.exports.runEncode = runEncode;
