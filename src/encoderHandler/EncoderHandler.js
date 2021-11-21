const { stderr } = process;
const { Encoder } = require("../encoder/Encoder");
const { regexPattern } = require("../constants/constants");

class EncoderHandler {
  static instance;

  static getInstance() {
    if (!EncoderHandler.instance) {
      EncoderHandler.instance = new EncoderHandler();
    }

    return EncoderHandler.instance;
  }

  encoder = new Encoder();

  pattern = "";

  string = "";

  encode(string) {
    if (!string || typeof string !== "string") {
      stderr.write(
        "EncoderHandler encode: the parameter 'string' is required as string"
      );
      process.exit(9);
    }

    this.setString(string);
    this.runEncode();
  }

  init(pattern) {
    if (!pattern || typeof pattern !== "string") {
      stderr.write(
        "EncoderHandler encode: the parameter 'pattern' is required as string"
      );
      process.exit(9);
    }

    this.pattern = pattern;
    this.validate();
  }

  validate() {
    if (!regexPattern.test(this.pattern)) {
      stderr.write(
        `Incorrect parameter value of config: "${this.pattern}", example: "XY(-)"`
      );
      process.exit(9);
    }

    return true;
  }

  setString(string) {
    this.string = string;
  }

  runEncode() {
    this.encoder.init(this.pattern);
    this.encoder.encode(this.string);
  }

  get outputValue() {
    return this.encoder.encodedString;
  }
}

module.exports.EncoderHandler = EncoderHandler;
