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
    this.setString(string);
    this.runEncode();
  }

  init(pattern) {
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
  }

  setString(string) {
    this.string = string;
  }

  runEncode() {
    this.encoder.init(this.pattern);
    this.encoder.encode(this.string);
  }

  get outputValue() {
    return this.encoder.encodedValue;
  }
}

module.exports.EncoderHandler = EncoderHandler;
