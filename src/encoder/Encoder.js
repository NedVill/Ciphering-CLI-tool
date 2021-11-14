const { stderr } = process;
const { runEncode } = require("./utils/runEncode");

class Encoder {
  params = [];

  encodedValue = "";

  init(config) {
    this.setParams(config);
  }

  setParams(config) {
    if (!config) {
      stderr.write("Cryptor: config is required!");
      process.exit();
    }

    this.params = config.split("-");
  }

  encode(string, index = 0) {
    if (!this.params[index]) {
      this.encodedValue = string;
      return;
    }

    const param = this.params[index];

    return this.encode(runEncode(param[0], param[1], string), index + 1);
  }

  get encodedValue() {
    return this.encodedValue;
  }
}

module.exports.Encoder = Encoder;
