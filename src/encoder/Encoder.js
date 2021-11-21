const { stderr } = process;
const { runEncode } = require("./utils/runEncode");

class Encoder {
  params = [];

  encodedString = "";

  init(config) {
    this.setParams(config);
  }

  setParams(config) {
    if (!config || typeof config !== "string") {
      stderr.write("Encoder: config is required as string!");
      process.exit(9);
    }

    this.params = config.split("-");
  }

  encode(string = "", index = 0) {
    if (!this.params[index] || !string) {
      this.encodedString = string;
      return true;
    }

    return this.encode(
      runEncode({
        method: this.params[index][0],
        mode: this.params[index][1],
        string: string,
      }),
      index + 1
    );
  }

  get encodedValue() {
    return this.encodedString;
  }
}

module.exports.Encoder = Encoder;
