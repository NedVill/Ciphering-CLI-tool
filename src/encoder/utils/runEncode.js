const { stderr } = process;
const { caesarCipher } = require("../../_common/caesarCipher/caesarCipher");
const { atbashCipher } = require("../../_common/atbashCipher/atbashCipher");

const runEncode = (params) => {
  if (!params.method || typeof params.method !== "string") {
    stderr.write("runEncode: method is required as string!");
    process.exit(9);
  }

  if (!params.string || typeof params.string !== "string") {
    stderr.write("runEncode: string is required as string!");
    process.exit(9);
  }

  const modeNumber = parseFloat(params.mode);

  if (modeNumber > 1 || modeNumber < 0) {
    stderr.write("runEncode: mode is required as number in range 0 - 1!");
    process.exit(9);
  }

  const currentMode = modeNumber ? "encode" : "decode";

  switch (params.method) {
    case "C":
      return caesarCipher({
        string: params.string,
        mode: currentMode,
        step: 1,
      });
    case "A":
      return atbashCipher(params.string);
    case "R":
      return caesarCipher({
        string: params.string,
        mode: currentMode,
        step: 8,
      });
  }
};

module.exports.runEncode = runEncode;
